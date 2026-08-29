import test from 'node:test';
import assert from 'node:assert/strict';

import {
  withIdempotentResult,
  markEventProcessed,
  unmarkEventProcessed,
} from '#shared/utils/idempotency.js';

function makeFakeRedis() {
  const store = new Map(); // key -> { value, expiresAt }

  function isLive(entry) {
    return entry && (!entry.expiresAt || Date.now() <= entry.expiresAt);
  }

  return {
    async get(key) {
      const entry = store.get(key);
      return isLive(entry) ? entry.value : null;
    },
    async set(key, value, ...args) {
      let ttlSeconds;
      let nx = false;
      for (let i = 0; i < args.length; i += 1) {
        if (args[i] === 'EX') ttlSeconds = Number(args[i + 1]);
        if (args[i] === 'NX') nx = true;
      }
      if (nx && isLive(store.get(key))) return null;
      store.set(key, { value, expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null });
      return 'OK';
    },
    async del(key) {
      return store.delete(key) ? 1 : 0;
    },
  };
}

test('withIdempotentResult runs computeFn once for a fresh key', async () => {
  const redis = makeFakeRedis();
  let calls = 0;
  const computeFn = async () => {
    calls += 1;
    return { orderId: 'order1' };
  };

  const { replayed, result } = await withIdempotentResult(redis, 'key1', 600, computeFn);

  assert.equal(replayed, false);
  assert.deepEqual(result, { orderId: 'order1' });
  assert.equal(calls, 1);
});

test('withIdempotentResult replays the stored result for a repeated key, without recomputing', async () => {
  const redis = makeFakeRedis();
  let calls = 0;
  const computeFn = async () => {
    calls += 1;
    return { orderId: 'order1' };
  };

  await withIdempotentResult(redis, 'key1', 600, computeFn);
  const second = await withIdempotentResult(redis, 'key1', 600, computeFn);

  assert.equal(second.replayed, true);
  assert.deepEqual(second.result, { orderId: 'order1' });
  assert.equal(calls, 1, 'computeFn must not run a second time for the same key');
});

test('withIdempotentResult rejects a concurrent call still in flight for the same key', async () => {
  const redis = makeFakeRedis();
  const computeFn = async () => ({ orderId: 'order1' });

  // Claim the key manually to simulate a first request still mid-flight.
  await redis.set('idempotency:key1', 'pending', 'EX', 600, 'NX');

  await assert.rejects(
    () => withIdempotentResult(redis, 'key1', 600, computeFn),
    (error) => {
      assert.equal(error.statusCode, 409);
      assert.equal(error.expose, true);
      return true;
    }
  );
});

test('withIdempotentResult releases the claim when computeFn throws, so the same key can retry', async () => {
  const redis = makeFakeRedis();
  let calls = 0;
  const computeFn = async () => {
    calls += 1;
    if (calls === 1) throw new Error('transient failure');
    return { orderId: 'order1' };
  };

  await assert.rejects(() => withIdempotentResult(redis, 'key1', 600, computeFn), {
    message: 'transient failure',
  });

  const second = await withIdempotentResult(redis, 'key1', 600, computeFn);

  assert.equal(second.replayed, false);
  assert.deepEqual(second.result, { orderId: 'order1' });
  assert.equal(calls, 2, 'computeFn must be retried after the failed attempt released the claim');
});

test('markEventProcessed returns true the first time and false on replay', async () => {
  const redis = makeFakeRedis();

  const first = await markEventProcessed(redis, 'evt_1', 86400);
  const second = await markEventProcessed(redis, 'evt_1', 86400);

  assert.equal(first, true);
  assert.equal(second, false);
});

test('unmarkEventProcessed deletes the dedup key so a later delivery is treated as first again', async () => {
  const redis = makeFakeRedis();

  await markEventProcessed(redis, 'evt_1', 86400);
  await unmarkEventProcessed(redis, 'evt_1');

  const retried = await markEventProcessed(redis, 'evt_1', 86400);
  assert.equal(
    retried,
    true,
    'the key must be gone after unmarking, so a retry can claim it again'
  );
});
