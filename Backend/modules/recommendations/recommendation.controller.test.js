import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getSimilarProducts,
  getRecommendationsForMe,
} from '#modules/recommendations/recommendation.controller.js';

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

function makeFakeOrderModel(orders) {
  return {
    find(filter) {
      const productId = filter['orderItems.product'];
      const matched = orders.filter((o) =>
        o.orderItems.some((item) => String(item.product) === String(productId))
      );
      return Promise.resolve(matched);
    },
  };
}

function makeFakeProductModel(products) {
  return {
    find(filter) {
      if (filter._id && filter._id.$in) {
        const wanted = new Set(filter._id.$in.map(String));
        return Promise.resolve(products.filter((p) => wanted.has(String(p._id))));
      }
      if (filter.category) {
        return {
          sort() {
            return {
              limit(n) {
                let filtered = products.filter((p) => p.category === filter.category);
                if (filter._id && filter._id.$ne) {
                  filtered = filtered.filter((p) => String(p._id) !== String(filter._id.$ne));
                }
                return Promise.resolve(filtered.slice(0, n));
              },
            };
          },
        };
      }
      return Promise.resolve([]);
    },
    findById(id) {
      return Promise.resolve(products.find((p) => String(p._id) === String(id)) || null);
    },
  };
}

function makeFakeRedis({ failing = false } = {}) {
  const store = new Map();
  return {
    async get(key) {
      if (failing) throw new Error('redis down');
      return store.get(key) || null;
    },
    async set(key, value) {
      if (failing) throw new Error('redis down');
      store.set(key, value);
      return 'OK';
    },
  };
}

test('getSimilarProducts returns co-purchased products ranked by frequency, excluding the target itself', async () => {
  const products = [
    { _id: 'p1', name: 'Target', category: 'Electronics' },
    { _id: 'p2', name: 'Often bought with p1', category: 'Electronics' },
    { _id: 'p3', name: 'Sometimes bought with p1', category: 'Fashion' },
  ];
  const orders = [
    { _id: 'o1', orderItems: [{ product: 'p1' }, { product: 'p2' }] },
    { _id: 'o2', orderItems: [{ product: 'p1' }, { product: 'p2' }] },
    { _id: 'o3', orderItems: [{ product: 'p1' }, { product: 'p3' }] },
  ];
  const productModel = makeFakeProductModel(products);
  const orderModel = makeFakeOrderModel(orders);
  const redisClient = makeFakeRedis();

  const req = { params: { productId: 'p1' }, query: {} };
  const res = makeRes();

  await getSimilarProducts(req, res, undefined, { productModel, orderModel, redisClient });

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.source, 'cooccurrence');
  assert.deepEqual(
    res.body.data.map((p) => p._id),
    ['p2', 'p3']
  );
});

test('getSimilarProducts falls back to same-category products when there is no order history for this product', async () => {
  const products = [
    { _id: 'p1', name: 'Target', category: 'Electronics' },
    { _id: 'p2', name: 'Same category', category: 'Electronics' },
    { _id: 'p3', name: 'Different category', category: 'Fashion' },
  ];
  const productModel = makeFakeProductModel(products);
  const orderModel = makeFakeOrderModel([]); // no orders at all yet
  const redisClient = makeFakeRedis();

  const req = { params: { productId: 'p1' }, query: {} };
  const res = makeRes();

  await getSimilarProducts(req, res, undefined, {
    productModel,
    orderModel,
    redisClient,
    fallbackProduct: products[0],
  });

  assert.equal(res.body.source, 'same-category-fallback');
  assert.deepEqual(
    res.body.data.map((p) => p._id),
    ['p2']
  );
});

test('getSimilarProducts still works when Redis is unreachable', async () => {
  const products = [
    { _id: 'p1', name: 'Target', category: 'Electronics' },
    { _id: 'p2', name: 'Co-bought', category: 'Electronics' },
  ];
  const orders = [{ _id: 'o1', orderItems: [{ product: 'p1' }, { product: 'p2' }] }];
  const productModel = makeFakeProductModel(products);
  const orderModel = makeFakeOrderModel(orders);
  const redisClient = makeFakeRedis({ failing: true });

  const req = { params: { productId: 'p1' }, query: {} };
  const res = makeRes();

  await getSimilarProducts(req, res, undefined, { productModel, orderModel, redisClient });

  assert.equal(res.statusCode, 200);
  assert.deepEqual(
    res.body.data.map((p) => p._id),
    ['p2']
  );
});

test('getSimilarProducts serves a cached result on the second call without re-querying orders', async () => {
  const products = [
    { _id: 'p1', name: 'Target', category: 'Electronics' },
    { _id: 'p2', name: 'Co-bought', category: 'Electronics' },
  ];
  const orders = [{ _id: 'o1', orderItems: [{ product: 'p1' }, { product: 'p2' }] }];
  const productModel = makeFakeProductModel(products);
  let orderFindCalls = 0;
  const realOrderModel = makeFakeOrderModel(orders);
  const orderModel = {
    find(filter) {
      orderFindCalls += 1;
      return realOrderModel.find(filter);
    },
  };
  const redisClient = makeFakeRedis();

  const req = { params: { productId: 'p1' }, query: {} };

  await getSimilarProducts(req, makeRes(), undefined, { productModel, orderModel, redisClient });
  await getSimilarProducts(req, makeRes(), undefined, { productModel, orderModel, redisClient });

  assert.equal(orderFindCalls, 1);
});

function makeFakeUserModel(users) {
  return {
    findById(id) {
      return Promise.resolve(users.find((u) => String(u._id) === String(id)) || null);
    },
  };
}

test("getRecommendationsForMe recommends products co-bought with the user's recently viewed products, excluding items already in their cart", async () => {
  const users = [
    {
      _id: 'user_1',
      preferences: { viewedProducts: ['p1'] },
      cart: [{ productId: 'p2' }], // already in cart — must be excluded from recs
    },
  ];
  const products = [
    { _id: 'p1', name: 'Viewed', category: 'Electronics' },
    { _id: 'p2', name: 'Already in cart', category: 'Electronics' },
    { _id: 'p3', name: 'Co-bought with p1', category: 'Fashion' },
  ];
  const orders = [
    { _id: 'o1', orderItems: [{ product: 'p1' }, { product: 'p2' }] },
    { _id: 'o2', orderItems: [{ product: 'p1' }, { product: 'p3' }] },
  ];
  const userModel = makeFakeUserModel(users);
  const productModel = makeFakeProductModel(products);
  const orderModel = makeFakeOrderModel(orders);
  const redisClient = makeFakeRedis();

  const req = { user: { _id: 'user_1' } };
  const res = makeRes();

  await getRecommendationsForMe(req, res, undefined, {
    userModel,
    productModel,
    orderModel,
    redisClient,
  });

  assert.equal(res.statusCode, 200);
  assert.deepEqual(
    res.body.data.map((p) => p._id),
    ['p3']
  );
});

test('getRecommendationsForMe returns an empty list for a user with no viewing history yet', async () => {
  const users = [{ _id: 'user_1', preferences: { viewedProducts: [] }, cart: [] }];
  const userModel = makeFakeUserModel(users);
  const productModel = makeFakeProductModel([]);
  const orderModel = makeFakeOrderModel([]);
  const redisClient = makeFakeRedis();

  const req = { user: { _id: 'user_1' } };
  const res = makeRes();

  await getRecommendationsForMe(req, res, undefined, {
    userModel,
    productModel,
    orderModel,
    redisClient,
  });

  assert.deepEqual(res.body.data, []);
});
