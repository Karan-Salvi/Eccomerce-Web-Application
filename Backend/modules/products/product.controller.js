import Product from '#modules/products/product.model.js';
import catchAsyncErrors from '#shared/middlewares/catchAsyncErrors.js';
import { uploadOnCloudinary } from '#shared/utils/cloudinary.js';
import redisClient from '#config/redis.js';
import logger from '#infra/logger/logger.js';
import updateUserPreferences from '#shared/utils/updateUserPreferences.js';
import { PRODUCT_SORT, PRODUCT_SORT_OPTIONS } from '#shared/constants/productSort.constants.js';

// Create Product -- Admin
export const createProduct = catchAsyncErrors(async (req, res) => {
  const files = req.files['image'];

  const uploadPromises = files.map((file) => uploadOnCloudinary(file.path));
  const uploadedImages = await Promise.all(uploadPromises);

  const images = uploadedImages.map((image) => ({ url: image }));

  const { name, description, price, ratings, category, stock } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    ratings,
    category,
    stock,
    images,
    createdBy: req.user._id,
  });

  logger.info(`Product created: ${product._id}`);

  // Clear cache for product list
  await redisClient.del('all_products');

  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

// Get All Products -- User
export const getAllProducts = catchAsyncErrors(async (req, res) => {
  const cachedData = await redisClient.get('all_products');

  if (cachedData) {
    logger.info('Products served from Redis');
    return res.json({
      success: true,
      message: 'Fetched from cache',
      data: JSON.parse(cachedData),
    });
  }

  const products = await Product.find();
  // await redisClient.setEx("all_products", 3600, JSON.stringify(products));
  await redisClient.set('all_products', JSON.stringify(products), 'EX', 3600);

  logger.info('Products served from DB');

  return res.json({
    success: true,
    message: 'Fetched from DB',
    data: products,
  });
});

// export const getPaginatedProducts = catchAsyncErrors(async (req, res) => {
//   // Parse query params
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 12;
//   const category = req.query.category;
//   const skip = (page - 1) * limit;

//   // Create unique cache key based on page and limit
//   const cacheKey = `all_products_page_${page}_limit_${limit}`;

//   // Try fetching from Redis cache
//   const cachedData = await redisClient.get(cacheKey);
//   if (cachedData) {
//     logger.info(`Products served from Redis: ${cacheKey}`);
//     return res.json({
//       success: true,
//       message: "Fetched from cache",
//       data: JSON.parse(cachedData),
//     });
//   }

//   // Fetch from MongoDB with pagination
//   const products = await Product.find({ category }).skip(skip).limit(limit);

//   // Cache the paginated results
//   await redisClient.set(cacheKey, JSON.stringify(products), "EX", 3600);

//   logger.info(`Products served from DB: ${cacheKey}`);
//   return res.json({
//     success: true,
//     message: "Fetched from DB",
//     data: products,
//   });
// });

// Update Product -- Admin

// export const getPaginatedProducts = catchAsyncErrors(async (req, res) => {
//   const page = parseInt(req.query.page, 10) || 1;
//   const limit = parseInt(req.query.limit, 10) || 12;
//   const category = req.query.category;
//   const skip = (page - 1) * limit;

//   // Build filter dynamically
//   const filter = {};
//   if (category) {
//     filter.category = category;
//   }

//   // Unique cache key (includes category)
//   const cacheKey = `products_page_${page}_limit_${limit}_category_${
//     category || "all"
//   }`;

//   // Try Redis first
//   const cachedData = await redisClient.get(cacheKey);
//   if (cachedData) {
//     logger.info(`Products served from Redis: ${cacheKey}`);
//     return res.status(200).json({
//       success: true,
//       message: "Fetched from cache",
//       data: JSON.parse(cachedData).products,
//     });
//   }

//   // Fetch from DB
//   const [products, totalProducts] = await Promise.all([
//     Product.find(filter)
//       .sort({ createdAt: -1 }) // newest first
//       .skip(skip)
//       .limit(limit),
//     Product.countDocuments(filter),
//   ]);

//   const responseData = {
//     pagination: {
//       page,
//       limit,
//       totalProducts,
//       totalPages: Math.ceil(totalProducts / limit),
//     },
//   };

//   // Cache response
//   await redisClient.set(
//     cacheKey,
//     JSON.stringify(responseData),
//     "EX",
//     3600 // 1 hour
//   );

//   logger.info(`Products served from DB: ${cacheKey}`);

//   return res.status(200).json({
//     success: true,
//     message: "Fetched from DB",
//     data: products,
//     ...responseData,
//   });
// });

// export const getPaginatedProducts = catchAsyncErrors(async (req, res) => {
//   const page = parseInt(req.query.page, 10) || 1;
//   const limit = parseInt(req.query.limit, 10) || 12;
//   const skip = (page - 1) * limit;

//   const {
//     category,
//     sort = PRODUCT_SORT.NEWEST,
//     minPrice,
//     maxPrice,
//     minRating,
//     inStock,
//   } = req.query;

//   const filter = {};

//   if (category) {
//     filter.category = category;
//   }

//   if (minPrice || maxPrice) {
//     filter.price = {};
//     if (minPrice) filter.price.$gte = Number(minPrice);
//     if (maxPrice) filter.price.$lte = Number(maxPrice);
//   }

//   if (minRating) {
//     filter.ratings = { $gte: Number(minRating) };
//   }

//   if (inStock === "true") {
//     filter.inStock = { $gt: 0 };
//   }

//   const sortOption =
//     PRODUCT_SORT_OPTIONS[sort] || PRODUCT_SORT_OPTIONS[PRODUCT_SORT.NEWEST];

//   const cacheKey = `products_page_${page}_limit_${limit}_cat_${
//     category || "all"
//   }_sort_${sort}_minP_${minPrice || "na"}_maxP_${maxPrice || "na"}_rating_${
//     minRating || "na"
//   }_stock_${inStock || "all"}`;

//   const cachedData = await redisClient.get(cacheKey);
//   if (cachedData) {
//     logger.info(`Products served from Redis: ${cacheKey}`);
//     return res.status(200).json({
//       success: true,
//       message: "Fetched from cache",
//       data: JSON.parse(cachedData).products,
//       ...JSON.parse(cachedData),
//     });
//   }

//   const [products, totalProducts] = await Promise.all([
//     Product.find(filter).sort(sortOption).skip(skip).limit(limit),
//     Product.countDocuments(filter),
//   ]);

//   const responseData = {
//     products,
//     filtersApplied: {
//       category,
//       sort,
//       minPrice,
//       maxPrice,
//       minRating,
//       inStock,
//     },
//     pagination: {
//       page,
//       limit,
//       totalProducts,
//       totalPages: Math.ceil(totalProducts / limit),
//     },
//   };

//   await redisClient.set(cacheKey, JSON.stringify(responseData), "EX", 3600);

//   return res.status(200).json({
//     success: true,
//     message: "Fetched from DB",
//     data: products,
//     ...responseData,
//   });
// });

export const getPaginatedProducts = catchAsyncErrors(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 12, 100);
  const skip = (page - 1) * limit;

  const { category, sort, minPrice, maxPrice, minRating, inStock, search } = req.query;

  /* ------------------ FILTER BUILD ------------------ */
  const filter = {};

  if (category) {
    const categories = category.split(',').map((c) => c.trim());
    filter.category = { $in: categories };
  }

  if (search) {
    filter.$text = { $search: search };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (minRating) {
    filter.ratings = { $gte: Number(minRating) };
  }

  if (inStock === 'true') {
    filter.inStock = { $gt: 0 };
  }

  /* ------------------ SORT BUILD ------------------ */
  let sortOption = PRODUCT_SORT_OPTIONS[sort] || PRODUCT_SORT_OPTIONS[PRODUCT_SORT.NEWEST];

  if (search) {
    sortOption = {
      score: { $meta: 'textScore' },
      ...sortOption,
    };
  }

  /* ------------------ REDIS CACHE KEY ------------------ */
  const cacheKey = [
    'products',
    `p:${page}`,
    `l:${limit}`,
    `cat:${category || 'all'}`,
    `sort:${sort}`,
    `minP:${minPrice || 'na'}`,
    `maxP:${maxPrice || 'na'}`,
    `rating:${minRating || 'na'}`,
    `stock:${inStock || 'all'}`,
    `search:${search || 'na'}`,
  ].join('|');

  /* ------------------ CACHE HIT ------------------ */
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    logger.info(`Products served from Redis → ${cacheKey}`);
    return res.status(200).json({
      success: true,
      source: 'cache',
      message: 'Fetched from cache',
      data: JSON.parse(cachedData).products,
      ...JSON.parse(cachedData),
    });
  }

  /* ------------------ DB QUERY ------------------ */
  const projection = search ? { score: { $meta: 'textScore' } } : {};

  const [products, totalProducts] = await Promise.all([
    Product.find(filter, projection).sort(sortOption).skip(skip).limit(limit).lean(),

    Product.countDocuments(filter),
  ]);

  /* ------------------ RESPONSE ------------------ */
  const responseData = {
    products,
    filtersApplied: {
      category,
      sort,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      search,
    },
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      hasNextPage: skip + products.length < totalProducts,
    },
  };

  /* ------------------ CACHE STORE (REDIS v3 STYLE) ------------------ */
  await redisClient.set(
    cacheKey,
    JSON.stringify(responseData),
    'EX',
    3600 // 1 hour TTL
  );

  return res.status(200).json({
    success: true,
    source: 'db',
    data: products,
    message: 'Fetched from DB',
    ...responseData,
  });
});

export const updateProduct = catchAsyncErrors(async (req, res) => {
  const productId = req.params.id;

  let product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  await redisClient.del('all_products');
  await redisClient.del(`product_${productId}`);

  logger.info(`Product ${productId} updated`);

  return res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});

// delete Product -- Admin
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  await Product.findByIdAndDelete(req.params.id);

  await redisClient.del('all_products');
  await redisClient.del(`product_${req.params.id}`);

  logger.info(`Product ${req.params.id} deleted`);

  return res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Get Single Product
// const getProductDetails = catchAsyncErrors(async (req, res) => {
//   const productId = req.params.id;
//   const cacheKey = `product_${productId}`;

//   const cachedProduct = await redisClient.get(cacheKey);
//   if (cachedProduct) {
//     logger.info(`Product ${productId} served from Redis`);
//     return res.status(200).json({
//       success: true,
//       message: "Fetched from cache",
//       data: JSON.parse(cachedProduct),
//     });
//   }

//   const product = await Product.findById(productId);
//   if (!product) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Product not found" });
//   }

//   updateUserPreferences(req.user._id, {
//     productId: product?._id,
//     category: product?.category,
//     brand: product?.brand,
//     tags: product?.tags,
//   });

//   // await redisClient.setEx(cacheKey, 3600, JSON.stringify(product));
//   await redisClient.set(cacheKey, JSON.stringify(product), "EX", 3600);
//   logger.info(`Product ${productId} served from DB`);

//   return res.status(200).json({
//     success: true,
//     message: "Product fetched successfully",
//     data: product,
//   });
// });

export const getProductDetails = catchAsyncErrors(async (req, res) => {
  const productId = req.params.id;
  const cacheKey = `product_${productId}`;

  // Check Redis cache
  try {
    const cachedProduct = await redisClient.get(cacheKey);
    if (cachedProduct) {
      logger.info(`Product ${productId} served from Redis`);
      return res.status(200).json({
        success: true,
        message: 'Fetched from cache',
        data: JSON.parse(cachedProduct),
      });
    }
  } catch (err) {
    logger.error(`Redis GET failed: ${err.message}`);
  }

  // Fetch product from DB and populate review names
  const product = await Product.findById(productId).populate('reviews.name', 'name email');

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Spread user details inside each review
  const productWithSpreadReviews = {
    ...product.toObject(),
    reviews: product.reviews.map((review) => ({
      ...review.toObject(),
      user: review.name, // renamed for clarity
    })),
  };

  // Cache it
  try {
    await redisClient.set(cacheKey, JSON.stringify(productWithSpreadReviews), 'EX', 3600);
  } catch (err) {
    logger.error(`Redis SET failed: ${err.message}`);
  }

  // Update preferences
  if (req.user && req.user._id) {
    await updateUserPreferences(req.user._id, {
      productId: product._id,
      category: product.category,
      brand: product.brand,
      tags: product.tags,
    });
  }

  logger.info(`Product ${productId} served from DB`);

  return res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    data: productWithSpreadReviews,
  });
});

// create new product review or update the review
export const createProductReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const existingReview = product.reviews.find((r) => r.name.toString() === req.user._id.toString());

  if (existingReview) {
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    product.reviews.push({
      name: req.user._id,
      createdBy: req.user.name,
      rating: Number(rating),
      comment,
    });
    product.numOfReviews = product.reviews.length;
  }

  product.ratings = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  await redisClient.del(`product_${productId}`);

  logger.info(`Review added/updated for product ${productId}`);

  return res.status(200).json({
    success: true,
    message: 'Review added/updated successfully',
    data: product,
  });
});

// get all product review
export const getAllReviews = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  return res.status(200).json({
    success: true,
    message: 'Reviews fetched successfully',
    data: product.reviews,
  });
});

// delete review
export const deleteProductReview = catchAsyncErrors(async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  product.reviews = product.reviews.filter((review) => review._id.toString() !== req.params.id);

  product.ratings =
    product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length || 0;

  product.numOfReviews = product.reviews.length;

  await product.save({ validateBeforeSave: false });
  await redisClient.del(`product_${productId}`);

  logger.info(`Review deleted from product ${productId}`);

  return res.status(200).json({
    success: true,
    message: 'Review deleted successfully',
    data: product.reviews,
  });
});
