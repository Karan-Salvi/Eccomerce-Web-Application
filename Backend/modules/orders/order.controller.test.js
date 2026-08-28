import test from 'node:test';
import assert from 'node:assert/strict';

import { buildCodOrder } from '#modules/orders/order.controller.js';

function makeFakeProductModel(stockById, vendorById = new Map()) {
  return {
    async findOneAndUpdate(filter, update) {
      const id = filter._id;
      const current = stockById.get(id);
      const minRequired = filter.inStock ? filter.inStock.$gte : undefined;
      if (minRequired !== undefined && current < minRequired) return null;
      const next = current + (update.$inc ? update.$inc.inStock : 0);
      stockById.set(id, next);
      return { _id: id, inStock: next, createdBy: vendorById.get(id) };
    },
  };
}

function makeFakeOrderModel() {
  const created = [];
  return {
    created,
    async create(doc) {
      const order = { _id: 'order_1', ...doc };
      created.push(order);
      return order;
    },
  };
}

// Keeps reserveStock's cache invalidation off the real Redis client during tests.
const stockRedisClient = {
  async del() {
    return 1;
  },
  async incr() {
    return 1;
  },
};

test('buildCodOrder reserves stock and creates an order when stock is sufficient', async () => {
  const stockById = new Map([['p1', 5]]);
  const productModel = makeFakeProductModel(stockById);
  const orderModel = makeFakeOrderModel();

  const outcome = await buildCodOrder(
    {
      shippingInfo: { address: 'a', city: 'b', state: 'c', country: 'd', pinCode: 1, phoneNo: 1 },
      orderItems: [{ product: 'p1', quantity: 2, price: 100 }],
      userId: 'user_1',
      itemsPrice: 200,
      taxPrice: 18,
      shippingPrice: 0,
      totalPrice: 236,
    },
    { productModel, orderModel, stockRedisClient }
  );

  assert.equal(outcome.status, 201);
  assert.equal(outcome.body.success, true);
  assert.equal(stockById.get('p1'), 3);
  assert.equal(orderModel.created.length, 1);
});

test('buildCodOrder throws a 409 when stock is insufficient, without creating an order', async () => {
  const stockById = new Map([['p1', 1]]);
  const productModel = makeFakeProductModel(stockById);
  const orderModel = makeFakeOrderModel();

  await assert.rejects(
    () =>
      buildCodOrder(
        {
          shippingInfo: {
            address: 'a',
            city: 'b',
            state: 'c',
            country: 'd',
            pinCode: 1,
            phoneNo: 1,
          },
          orderItems: [{ product: 'p1', quantity: 2, price: 100 }],
          userId: 'user_1',
          itemsPrice: 200,
          taxPrice: 18,
          shippingPrice: 0,
          totalPrice: 236,
        },
        { productModel, orderModel, stockRedisClient }
      ),
    (error) => {
      assert.equal(error.statusCode, 409);
      assert.equal(error.expose, true);
      return true;
    }
  );

  assert.equal(orderModel.created.length, 0);
});

test("buildCodOrder attaches each item's vendor from reserveStock before creating the order", async () => {
  const stockById = new Map([['p1', 5]]);
  const vendorById = new Map([['p1', 'vendor_1']]);
  const productModel = makeFakeProductModel(stockById, vendorById);
  const orderModel = makeFakeOrderModel();

  await buildCodOrder(
    {
      shippingInfo: { address: 'a', city: 'b', state: 'c', country: 'd', pinCode: 1, phoneNo: 1 },
      orderItems: [{ product: 'p1', quantity: 2, price: 100 }],
      userId: 'user_1',
      itemsPrice: 200,
      taxPrice: 18,
      shippingPrice: 0,
      totalPrice: 236,
    },
    { productModel, orderModel, stockRedisClient }
  );

  assert.equal(orderModel.created.length, 1);
  assert.equal(orderModel.created[0].orderItems[0].vendor, 'vendor_1');
});
