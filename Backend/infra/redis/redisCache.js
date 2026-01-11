export const getOrSetCache = async (key, cb) => {
  const cached = await redisClient.get(key);
  if (cached) return JSON.parse(cached);

  const freshData = await cb();
  // await redisClient.setEx(key, 3600, JSON.stringify(freshData));
  await redisClient.set(key, JSON.stringify(freshData), 'EX', 3600);
  return freshData;
};
