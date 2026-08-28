import Product from '#modules/products/product.model.js';
import redisClient from '#config/redis.js';
import logger from '#infra/logger/logger.js';
import { bumpCacheVersion } from '#shared/utils/productCacheVersion.js';

export async function reserveStock(
  orderItems,
  { productModel = Product, redisClient: injectedRedisClient = redisClient } = {}
) {
  const reserved = [];

  for (const item of orderItems) {
    const updated = await productModel.findOneAndUpdate(
      { _id: item.product, inStock: { $gte: item.quantity } },
      { $inc: { inStock: -item.quantity } },
      { new: true }
    );

    if (!updated) {
      // ponytail: rollback via Promise.all can itself fail partway (fails fast, no retry) leaving stock inconsistent; upgrade path is Promise.allSettled + logging/alerting on any rollback failure, or a real Mongo transaction across all items instead of sequential findOneAndUpdate calls.
      await Promise.all(
        reserved.map(({ productId, quantity }) =>
          productModel.findOneAndUpdate(
            { _id: productId },
            { $inc: { inStock: quantity } },
            { new: true }
          )
        )
      );

      const error = new Error(`Insufficient stock for product ${item.product}`);
      error.statusCode = 409;
      error.expose = true;
      error.productId = item.product;
      throw error;
    }

    reserved.push({ productId: item.product, quantity: item.quantity, vendor: updated.createdBy });
  }

  // Best-effort cache invalidation: stock changed, so cached listings are stale.
  // A Redis failure here must not fail an already-committed reservation.
  try {
    await injectedRedisClient.del('all_products');
    await bumpCacheVersion(injectedRedisClient);
  } catch (error) {
    logger.error(`Cache invalidation after reserveStock failed: ${error.message}`);
  }

  return reserved;
}

export async function releaseStock(reserved, { productModel = Product } = {}) {
  await Promise.all(
    reserved.map(({ productId, quantity }) =>
      productModel.findOneAndUpdate({ _id: productId }, { $inc: { inStock: quantity } })
    )
  );
}
