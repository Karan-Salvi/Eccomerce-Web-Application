import Product from '#modules/products/product.model.js';
import Order from '#modules/orders/order.model.js';
import User from '#modules/users/user.model.js';
import redisClientDefault from '#config/redis.js';
import logger from '#infra/logger/logger.js';
import catchAsyncErrors from '#shared/middlewares/catchAsyncErrors.js';
import {
  computeCooccurrence,
  mergeScoreMaps,
} from '#modules/recommendations/recommendation.service.js';

const SIMILAR_PRODUCTS_LIMIT = 8;
const CACHE_TTL_SECONDS = 3600; // recommendations don't need instant consistency

export async function getSimilarProductsHandler(
  req,
  res,
  next,
  { productModel = Product, orderModel = Order, redisClient = redisClientDefault } = {}
) {
  const { productId } = req.params;
  const cacheKey = `similar_products:${productId}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      return res.status(200).json({ success: true, source: parsed.source, data: parsed.data });
    }
  } catch (err) {
    logger.error(`Redis GET failed for similar products, computing live: ${err.message}`);
  }

  const orders = await orderModel.find({ 'orderItems.product': productId });
  const scored = computeCooccurrence(orders, productId);

  let source = 'cooccurrence';
  let topIds = scored.slice(0, SIMILAR_PRODUCTS_LIMIT).map((s) => s.productId);

  let data;
  if (topIds.length > 0) {
    data = await productModel.find({ _id: { $in: topIds } });
    // Preserve the co-occurrence ranking — Mongo doesn't guarantee $in order.
    const byId = new Map(data.map((p) => [String(p._id), p]));
    data = topIds.map((id) => byId.get(id)).filter(Boolean);
  } else {
    source = 'same-category-fallback';
    const target = await productModel.findById(productId);
    data = target
      ? await productModel
          .find({ category: target.category, _id: { $ne: productId } })
          .sort({ ratings: -1 })
          .limit(SIMILAR_PRODUCTS_LIMIT)
      : [];
  }

  try {
    await redisClient.set(cacheKey, JSON.stringify({ source, data }), 'EX', CACHE_TTL_SECONDS);
  } catch (err) {
    logger.error(`Redis SET failed for similar products: ${err.message}`);
  }

  return res.status(200).json({ success: true, source, data });
}

export async function getSimilarProducts(req, res, next, deps) {
  return getSimilarProductsHandler(req, res, next, deps);
}

export const getSimilarProductsRoute = catchAsyncErrors((req, res) =>
  getSimilarProductsHandler(req, res)
);

const FOR_ME_LIMIT = 12;

export async function getRecommendationsForMeHandler(
  req,
  res,
  next,
  {
    userModel = User,
    productModel = Product,
    orderModel = Order,
    redisClient = redisClientDefault,
  } = {}
) {
  const userId = req.user._id;
  const cacheKey = `recommendations_for_me:${userId}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json({ success: true, data: JSON.parse(cached) });
    }
  } catch (err) {
    logger.error(
      `Redis GET failed for personalized recommendations, computing live: ${err.message}`
    );
  }

  const user = await userModel.findById(userId);
  const seedProductIds = (user?.preferences?.viewedProducts || []).map(String);
  const excludeIds = new Set([
    ...seedProductIds,
    ...(user?.cart || []).map((item) => String(item.productId)),
  ]);

  let data = [];
  if (seedProductIds.length > 0) {
    const scoreMaps = await Promise.all(
      seedProductIds.map(async (seedId) => {
        const orders = await orderModel.find({ 'orderItems.product': seedId });
        return computeCooccurrence(orders, seedId);
      })
    );

    const merged = mergeScoreMaps(scoreMaps, FOR_ME_LIMIT, excludeIds);
    const topIds = merged.map((s) => s.productId);

    if (topIds.length > 0) {
      const found = await productModel.find({ _id: { $in: topIds } });
      const byId = new Map(found.map((p) => [String(p._id), p]));
      data = topIds.map((id) => byId.get(id)).filter(Boolean);
    }
  }

  try {
    await redisClient.set(cacheKey, JSON.stringify(data), 'EX', CACHE_TTL_SECONDS);
  } catch (err) {
    logger.error(`Redis SET failed for personalized recommendations: ${err.message}`);
  }

  return res.status(200).json({ success: true, data });
}

export async function getRecommendationsForMe(req, res, next, deps) {
  return getRecommendationsForMeHandler(req, res, next, deps);
}

export const getRecommendationsForMeRoute = catchAsyncErrors((req, res) =>
  getRecommendationsForMeHandler(req, res)
);
