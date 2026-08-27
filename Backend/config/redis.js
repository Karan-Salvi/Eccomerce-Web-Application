import Redis from 'ioredis';
import dotenv from 'dotenv';

import logger from '#infra/logger/logger.js';

dotenv.config({ path: './.env' });

// lazyConnect: importing this module (e.g. transitively via route-introspection
// tests that never issue a Redis command) must not open a socket — ioredis's
// default retry strategy retries forever, which hangs `node --test` when Redis
// is unreachable. Real requests still connect fine on first .get/.set call.
const redisClient = new Redis(process.env.REDIS_URL, { lazyConnect: true });

redisClient.on('connect', () => {
  logger.info('Redis connected ');
});

redisClient.on('error', (err) => {
  logger.error('Redis error', err);
});

export default redisClient;
