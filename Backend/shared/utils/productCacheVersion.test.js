import test from 'node:test';
import assert from 'node:assert/strict';

import { getCacheVersion, bumpCacheVersion } from '#shared/utils/productCacheVersion.js';

function makeFakeRedis() {
  const store = new Map();
  return {
    async get(key) {
      return store.has(key) ? String(store.get(key)) : null;
    },
    async incr(key) {
      const next = (store.get(key) || 0) + 1;
      store.set(key, next);
      return next;
    },
  };
}

test('getCacheVersion defaults to 1 when no version has been set yet', async () => {
  const redis = makeFakeRedis();
  const version = await getCacheVersion(redis);
  assert.equal(version, 1);
});

test('bumpCacheVersion increments and getCacheVersion reflects the new value', async () => {
  const redis = makeFakeRedis();
  await getCacheVersion(redis); // establishes version 1
  const bumped = await bumpCacheVersion(redis);
  assert.equal(bumped, 2);
  assert.equal(await getCacheVersion(redis), 2);
});
