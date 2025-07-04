const mongoose = require("mongoose");
const logger = require("../utils/logger.js");
const dotenv = require("dotenv");
// dotenv configuration
dotenv.config({
  path: "./.env",
});

const DB_connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`
    );

    if (!connectionInstance) {
      logger.warn("MongoDB connection failed");
    }
    logger.info(
      "MongoDB connected successfully : " + connectionInstance.connection.host
    );
  } catch (error) {
    logger.error("MongoDB connection failed due to some error :", error);
  }
};

module.exports = DB_connect;
