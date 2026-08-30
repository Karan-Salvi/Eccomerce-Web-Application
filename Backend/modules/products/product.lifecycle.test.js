import test from 'node:test';
import assert from 'node:assert/strict';

import { afterProductWrite } from '#modules/products/product.lifecycle.js';

function makeFakeRedis({ failing = false } = {}) {
  const deleted = [];
  let version = 0;
  return {
    deleted,
    get version() {
      return version;
    },
    async del(key) {
      if (failing) throw new Error('redis down');
      deleted.push(key);
    },
    async incr() {
      if (failing) throw new Error('redis down');
      version += 1;
      return version;
    },
  };
}

test('afterProductWrite invalidates the flat product caches and bumps the version', async () => {
  const redisClient = makeFakeRedis();

  await afterProductWrite({ productId: 'p1' }, { redisClient });

  assert.deepEqual(redisClient.deleted, ['all_products', 'product_p1']);
  assert.equal(redisClient.version, 1);
});

test('afterProductWrite deletes every removed image from Cloudinary', async () => {
  const redisClient = makeFakeRedis();
  const deletedFromCloudinary = [];
  const deleteFromCloudinary = async (url) => deletedFromCloudinary.push(url);

  await afterProductWrite(
    { productId: 'p1', removedImageUrls: ['url-a', 'url-b'] },
    { redisClient, deleteFromCloudinary }
  );

  assert.deepEqual(deletedFromCloudinary.sort(), ['url-a', 'url-b']);
});

test('afterProductWrite swallows a Redis outage instead of throwing', async () => {
  const redisClient = makeFakeRedis({ failing: true });

  await assert.doesNotReject(() => afterProductWrite({ productId: 'p1' }, { redisClient }));
});
