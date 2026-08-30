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

// Cloudinary URLs look like
// https://res.cloudinary.com/<cloud>/image/upload/v<version>/<public_id>.<ext> —
// the public_id (what destroy() needs) is everything between "/upload/" and
// the extension, with the leading "v<digits>/" version segment stripped.
const extractPublicId = (url) => {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match?.[1] || null;
};

// Best-effort: the DB write is the source of truth, so a failed/partial
// Cloudinary deletion must never fail the caller's request.
export const deleteFromCloudinary = async (url) => {
  try {
    const publicId = extractPublicId(url);
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    logger.error('Cloudinary delete error: ', error);
  }
};
