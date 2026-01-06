const logger = require("../infra/logger/logger.js");
const Redis = require("ioredis");
const dotenv = require("dotenv");
// dotenv configuration
dotenv.config({
  path: "./.env",
});

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("connect", () => {
  logger.info("Redis connected ");
});

redisClient.on("error", (err) => {
  logger.error("Redis error", err);
});

module.exports = redisClient;
