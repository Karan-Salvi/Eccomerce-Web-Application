import test from 'node:test';
import assert from 'node:assert/strict';

import { reserveStock } from '#modules/products/product.stock.js';

function makeFakeProductModel(stockById) {
  const calls = [];
  return {
    calls,
    async findOneAndUpdate(filter, update) {
      calls.push({ filter, update });
      const id = filter._id;
      const current = stockById.get(id);

      if (update.$inc) {
        const delta = update.$inc.inStock;
        const minRequired = filter.inStock ? filter.inStock.$gte : undefined;
        if (minRequired !== undefined && current < minRequired) {
          return null; // simulates Mongo's findOneAndUpdate returning null on no match
        }
        stockById.set(id, current + delta);
        return { _id: id, inStock: current + delta };
      }

      return { _id: id, inStock: current };
    },
  };
}

function makeFakeRedis({ failing = false } = {}) {
  const store = new Map();
  const deleted = [];
  return {
    store,
    deleted,
    async del(key) {
      if (failing) throw new Error('redis down');
      deleted.push(key);
      return store.delete(key) ? 1 : 0;
    },
    async incr(key) {
      if (failing) throw new Error('redis down');
      const next = Number(store.get(key) || 0) + 1;
      store.set(key, next);
      return next;
    },
  };
}

test('reserveStock decrements each item and returns what it reserved', async () => {
  const stockById = new Map([
    ['p1', 10],
    ['p2', 5],
  ]);
  const productModel = makeFakeProductModel(stockById);

  const reserved = await reserveStock(
    [
      { product: 'p1', quantity: 3 },
      { product: 'p2', quantity: 2 },
    ],
    { productModel, redisClient: makeFakeRedis() }
  );

  assert.equal(stockById.get('p1'), 7);
  assert.equal(stockById.get('p2'), 3);
  assert.deepEqual(reserved, [
    { productId: 'p1', quantity: 3 },
    { productId: 'p2', quantity: 2 },
  ]);
});

test('reserveStock rejects and rolls back when a later item is short on stock', async () => {
  const stockById = new Map([
    ['p1', 10],
    ['p2', 1], // only 1 left, order wants 2
  ]);
  const productModel = makeFakeProductModel(stockById);

  await assert.rejects(
    () =>
      reserveStock(
        [
          { product: 'p1', quantity: 3 },
          { product: 'p2', quantity: 2 },
        ],
        { productModel, redisClient: makeFakeRedis() }
      ),
    (error) => {
      assert.equal(error.statusCode, 409);
      assert.equal(error.expose, true);
      assert.equal(error.productId, 'p2');
      return true;
    }
  );

  // p1 was decremented then must be rolled back since p2 failed
  assert.equal(stockById.get('p1'), 10);
  assert.equal(stockById.get('p2'), 1);
});

test('reserveStock never oversells under a simulated concurrent second buyer', async () => {
  // Simulates two requests racing for the last unit: the second call's
  // findOneAndUpdate() only "sees" stock after the first has already committed,
  // exactly like Mongo would serialize two real concurrent atomic updates.
  const stockById = new Map([['p1', 1]]);
  const productModel = makeFakeProductModel(stockById);

  const first = await reserveStock([{ product: 'p1', quantity: 1 }], { productModel, redisClient: makeFakeRedis() });
  assert.deepEqual(first, [{ productId: 'p1', quantity: 1 }]);

  await assert.rejects(
    () => reserveStock([{ product: 'p1', quantity: 1 }], { productModel, redisClient: makeFakeRedis() }),
    (error) => {
      assert.equal(error.statusCode, 409);
      return true;
    }
  );

  assert.equal(stockById.get('p1'), 0);
});

test('reserveStock invalidates the product cache after a successful reservation', async () => {
  const stockById = new Map([['p1', 5]]);
  const productModel = makeFakeProductModel(stockById);
  const redis = makeFakeRedis();

  await reserveStock([{ product: 'p1', quantity: 2 }], { productModel, redisClient: redis });

  assert.deepEqual(redis.deleted, ['all_products']);
  assert.equal(redis.store.get('products:cache:version'), 1);
});

test('reserveStock still succeeds when cache invalidation fails', async () => {
  const stockById = new Map([['p1', 5]]);
  const productModel = makeFakeProductModel(stockById);

  const reserved = await reserveStock(
    [{ product: 'p1', quantity: 2 }],
    { productModel, redisClient: makeFakeRedis({ failing: true }) }
  );

  assert.deepEqual(reserved, [{ productId: 'p1', quantity: 2 }]);
  assert.equal(stockById.get('p1'), 3);
});
