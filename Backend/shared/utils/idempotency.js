// ponytail: coarse per-key lock via a single Redis NX claim. If the process
// crashes mid-computeFn, the key stays 'pending' until its TTL expires — the
// caller is blocked from retrying for up to ttlSeconds. Upgrade path if that
// window ever matters: store a claim token + heartbeat, or move to a proper
// job queue with visibility timeouts.

export async function withIdempotentResult(redisClient, key, ttlSeconds, computeFn) {
  const cacheKey = `idempotency:${key}`;
  const claimed = await redisClient.set(cacheKey, 'pending', 'EX', ttlSeconds, 'NX');

  if (!claimed) {
    const existing = await redisClient.get(cacheKey);
    if (existing && existing !== 'pending') {
      return { replayed: true, result: JSON.parse(existing) };
    }
    const error = new Error('Duplicate request already in progress');
    error.statusCode = 409;
    error.expose = true;
    throw error;
  }

  let result;
  try {
    result = await computeFn();
  } catch (error) {
    // Release the claim so the caller can retry immediately instead of being
    // blocked by a stale 'pending' key for the rest of the TTL.
    await redisClient.del(cacheKey);
    throw error;
  }

  await redisClient.set(cacheKey, JSON.stringify(result), 'EX', ttlSeconds);
  return { replayed: false, result };
}

export async function markEventProcessed(redisClient, eventId, ttlSeconds) {
  const claimed = await redisClient.set(`stripe:event:${eventId}`, '1', 'EX', ttlSeconds, 'NX');
  return claimed === 'OK';
}

export async function unmarkEventProcessed(redisClient, eventId) {
  await redisClient.del(`stripe:event:${eventId}`);
}
