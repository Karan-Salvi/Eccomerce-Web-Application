import * as fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';
import logger from '#infra/logger/logger.js';

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(localFilePath, () => {
      logger.info('file removed successfully');
    });
    return response.url;
  } catch (error) {
    logger.error('Cloudinary upload error: ', error);
    fs.unlinkSync(localFilePath); //remove locally saved file on the operation got failed
    return null;
  }
};
