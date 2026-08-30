import mongoose from 'mongoose';
import dotenv from 'dotenv';

import logger from '#infra/logger/logger.js';

dotenv.config({ path: './.env' });

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`
    );

    logger.info('MongoDB connected successfully : ' + connectionInstance.connection.host);
  } catch (error) {
    logger.error('MongoDB connection failed due to some error :', error);
    throw error;
  }
};

export default dbConnect;
