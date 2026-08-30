const VERSION_KEY = 'products:cache:version';

export async function getCacheVersion(redisClient) {
  const value = await redisClient.get(VERSION_KEY);
  if (value) return Number(value);

  await redisClient.incr(VERSION_KEY);
  return 1;
}

export async function bumpCacheVersion(redisClient) {
  return redisClient.incr(VERSION_KEY);
}
