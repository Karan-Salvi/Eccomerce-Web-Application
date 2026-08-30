import test from 'node:test';
import assert from 'node:assert/strict';

import { getMyProducts, getMyOrders, getMyAnalytics } from '#modules/vendor/vendor.controller.js';

function makeRes() {
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

function makeFakeProductModel(products) {
  return {
    find(filter) {
      const matched = products.filter((p) => String(p.createdBy) === String(filter.createdBy));
      return {
        sort() {
          return this;
        },
        skip(n) {
          this._skip = n;
          return this;
        },
        limit(n) {
          this._limit = n;
          return this;
        },
        lean() {
          const start = this._skip || 0;
          const end = start + (this._limit || matched.length);
          return Promise.resolve(matched.slice(start, end));
        },
      };
    },
    countDocuments(filter) {
      return Promise.resolve(
        products.filter((p) => String(p.createdBy) === String(filter.createdBy)).length
      );
    },
  };
}

test("getMyProducts returns only the authenticated vendor's products, paginated", async () => {
  const products = [
    { _id: 'p1', name: 'A', createdBy: 'vendor_1' },
    { _id: 'p2', name: 'B', createdBy: 'vendor_1' },
    { _id: 'p3', name: 'C', createdBy: 'vendor_2' },
  ];
  const productModel = makeFakeProductModel(products);
  const req = { user: { _id: 'vendor_1' }, query: {} };
  const res = makeRes();

  await getMyProducts(req, res, undefined, { productModel });

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.length, 2);
  assert.deepEqual(res.body.data.map((p) => p._id).sort(), ['p1', 'p2']);
  assert.equal(res.body.pagination.totalProducts, 2);
});

test('getMyProducts paginates with page and limit query params', async () => {
  const products = [
    { _id: 'p1', createdBy: 'vendor_1' },
    { _id: 'p2', createdBy: 'vendor_1' },
    { _id: 'p3', createdBy: 'vendor_1' },
  ];
  const productModel = makeFakeProductModel(products);
  const req = { user: { _id: 'vendor_1' }, query: { page: '2', limit: '2' } };
  const res = makeRes();

  await getMyProducts(req, res, undefined, { productModel });

  assert.equal(res.body.data.length, 1);
  assert.equal(res.body.pagination.page, 2);
  assert.equal(res.body.pagination.totalPages, 2);
});

function makeFakeOrderModel(orders) {
  return {
    find(filter) {
      const vendorId = filter['orderItems.vendor'];
      const excludedStatus = filter.orderStatus?.$ne;
      const matched = orders.filter(
        (o) =>
          o.orderItems.some((item) => String(item.vendor) === String(vendorId)) &&
          (excludedStatus === undefined || o.orderStatus !== excludedStatus)
      );
      return {
        sort() {
          return Promise.resolve(matched);
        },
      };
    },
  };
}

// makeFakeOrderModel also honors an optional { orderStatus: { $ne: ... } }
// filter, even though getMyOrders itself never passes one — Task 8's
// getMyAnalytics reuses this same fake and does pass one, to exclude
// cancelled orders from revenue totals.
test("getMyOrders returns only orders containing this vendor's items", async () => {
  const orders = [
    { _id: 'o1', orderItems: [{ product: 'p1', vendor: 'vendor_1' }] },
    { _id: 'o2', orderItems: [{ product: 'p2', vendor: 'vendor_2' }] },
    {
      _id: 'o3',
      orderItems: [
        { product: 'p3', vendor: 'vendor_2' },
        { product: 'p1', vendor: 'vendor_1' },
      ],
    },
  ];
  const orderModel = makeFakeOrderModel(orders);
  const req = { user: { _id: 'vendor_1' } };
  const res = makeRes();

  await getMyOrders(req, res, undefined, { orderModel });

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.data.map((o) => o._id).sort(), ['o1', 'o3']);
});

function makeFakeProductModelForAnalytics(products) {
  return {
    find(filter) {
      return Promise.resolve(
        products.filter((p) => String(p.createdBy) === String(filter.createdBy))
      );
    },
  };
}

test('getMyAnalytics computes totals, top product, and category breakdowns scoped to this vendor', async () => {
  const now = new Date();
  const products = [
    { _id: 'p1', name: 'Widget', category: 'Electronics', createdBy: 'vendor_1' },
    { _id: 'p2', name: 'Gadget', category: 'Fashion', createdBy: 'vendor_1' },
    { _id: 'p3', name: 'Other Vendor Product', category: 'Electronics', createdBy: 'vendor_2' },
  ];
  const orders = [
    {
      _id: 'o1',
      createdAt: now,
      orderStatus: 'delivered',
      orderItems: [
        { product: 'p1', vendor: 'vendor_1', quantity: 3, price: 100 },
        { product: 'p3', vendor: 'vendor_2', quantity: 1, price: 50 },
      ],
    },
    {
      _id: 'o2',
      createdAt: now,
      orderStatus: 'processing',
      orderItems: [{ product: 'p2', vendor: 'vendor_1', quantity: 1, price: 200 }],
    },
  ];
  const productModel = makeFakeProductModelForAnalytics(products);
  const orderModel = makeFakeOrderModel(orders);
  const req = { user: { _id: 'vendor_1' } };
  const res = makeRes();

  await getMyAnalytics(req, res, undefined, { productModel, orderModel });

  assert.equal(res.statusCode, 200);
  const { data } = res.body;
  assert.equal(data.totalProducts, 2);
  assert.equal(data.totalSales, 4); // 3 (p1) + 1 (p2), vendor_2's item excluded
  assert.equal(data.totalRevenue, 500); // 3*100 + 1*200
  assert.equal(data.averageOrderValue, 250); // 500 / 2 distinct orders
  assert.equal(data.topSellingProduct, 'Widget'); // 3 units > 1 unit
  assert.deepEqual(
    data.categoryDistribution.sort((a, b) => a.category.localeCompare(b.category)),
    [
      { category: 'Electronics', count: 1, percentage: 50 },
      { category: 'Fashion', count: 1, percentage: 50 },
    ]
  );
  assert.deepEqual(
    data.revenueByCategory.sort((a, b) => a.category.localeCompare(b.category)),
    [
      { category: 'Electronics', revenue: 300 },
      { category: 'Fashion', revenue: 200 },
    ]
  );
});

test('getMyAnalytics excludes cancelled orders from every total', async () => {
  const now = new Date();
  const products = [{ _id: 'p1', name: 'Widget', category: 'Electronics', createdBy: 'vendor_1' }];
  const orders = [
    {
      _id: 'o1',
      createdAt: now,
      orderStatus: 'delivered',
      orderItems: [{ product: 'p1', vendor: 'vendor_1', quantity: 2, price: 100 }],
    },
    {
      _id: 'o2',
      createdAt: now,
      orderStatus: 'cancelled',
      orderItems: [{ product: 'p1', vendor: 'vendor_1', quantity: 10, price: 100 }],
    },
  ];
  const productModel = makeFakeProductModelForAnalytics(products);
  const orderModel = makeFakeOrderModel(orders);
  const req = { user: { _id: 'vendor_1' } };
  const res = makeRes();

  await getMyAnalytics(req, res, undefined, { productModel, orderModel });

  const { data } = res.body;
  // Only o1's 2 units/200 revenue should count; o2's 10 units/1000 must be excluded.
  assert.equal(data.totalSales, 2);
  assert.equal(data.totalRevenue, 200);
  assert.equal(data.averageOrderValue, 200);
});

test('getMyAnalytics handles a vendor with no products or orders', async () => {
  const productModel = makeFakeProductModelForAnalytics([]);
  const orderModel = makeFakeOrderModel([]);
  const req = { user: { _id: 'vendor_1' } };
  const res = makeRes();

  await getMyAnalytics(req, res, undefined, { productModel, orderModel });

  const { data } = res.body;
  assert.equal(data.totalProducts, 0);
  assert.equal(data.totalSales, 0);
  assert.equal(data.totalRevenue, 0);
  assert.equal(data.averageOrderValue, 0); // must not divide by zero
  assert.equal(data.topSellingProduct, 'N/A');
  assert.deepEqual(data.categoryDistribution, []);
  assert.deepEqual(data.revenueByCategory, []);
});
