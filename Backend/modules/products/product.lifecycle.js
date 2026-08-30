import redisClientDefault from '#config/redis.js';
import logger from '#infra/logger/logger.js';
import { deleteFromCloudinary as deleteFromCloudinaryDefault } from '#shared/utils/cloudinary.js';
import { bumpCacheVersion } from '#shared/utils/productCacheVersion.js';

// Everything that must happen after a product document changes: the flat
// all_products/product_:id caches go stale, the versioned paginated-list
// cache needs a version bump, and any images no longer on the product must
// leave Cloudinary. One call per write instead of each controller
// separately remembering cache + Cloudinary — that split is exactly how
// deleteProduct once shipped without its Cloudinary cleanup.
export async function afterProductWrite(
  { productId, removedImageUrls = [] },
  { redisClient = redisClientDefault, deleteFromCloudinary = deleteFromCloudinaryDefault } = {}
) {
  await Promise.all(removedImageUrls.map((url) => deleteFromCloudinary(url)));

  try {
    await Promise.all([redisClient.del('all_products'), redisClient.del(`product_${productId}`)]);
    await bumpCacheVersion(redisClient);
  } catch (err) {
    logger.error(`Product cache invalidation failed: ${err.message}`);
  }
}
