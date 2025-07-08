const Product = require("../models/product.model.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const redisClient = require("../config/redis.js");
const logger = require("../utils/logger.js");
const updateUserPreferences = require("../utils/updateUserPreferences.js");

// Create Product -- Admin
const createProduct = catchAsyncErrors(async (req, res) => {
  const files = req.files["image"];

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
  await redisClient.del("all_products");

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// Get All Products -- User
const getAllProducts = catchAsyncErrors(async (req, res) => {
  const cachedData = await redisClient.get("all_products");
  console.log("products called here");
  if (cachedData) {
    logger.info("Products served from Redis");
    return res.json({
      success: true,
      message: "Fetched from cache",
      data: JSON.parse(cachedData),
    });
  }

  const products = await Product.find();
  // await redisClient.setEx("all_products", 3600, JSON.stringify(products));
  await redisClient.set("all_products", JSON.stringify(products), "EX", 3600);

  logger.info("Products served from DB");

  return res.json({
    success: true,
    message: "Fetched from DB",
    data: products,
  });
});

const getPaginatedProducts = catchAsyncErrors(async (req, res) => {
  // Parse query params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Create unique cache key based on page and limit
  const cacheKey = `all_products_page_${page}_limit_${limit}`;

  console.log("Paginated products called here");

  // Try fetching from Redis cache
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    logger.info(`Products served from Redis: ${cacheKey}`);
    return res.json({
      success: true,
      message: "Fetched from cache",
      data: JSON.parse(cachedData),
    });
  }

  // Fetch from MongoDB with pagination
  const products = await Product.find().skip(skip).limit(limit);

  // Cache the paginated results
  await redisClient.set(cacheKey, JSON.stringify(products), "EX", 3600);

  logger.info(`Products served from DB: ${cacheKey}`);
  return res.json({
    success: true,
    message: "Fetched from DB",
    data: products,
  });
});

// Update Product -- Admin
const updateProduct = catchAsyncErrors(async (req, res) => {
  const productId = req.params.id;

  let product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  await redisClient.del("all_products");
  await redisClient.del(`product_${productId}`);

  logger.info(`Product ${productId} updated`);

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

// delete Product -- Admin
const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  await Product.findByIdAndDelete(req.params.id);

  await redisClient.del("all_products");
  await redisClient.del(`product_${req.params.id}`);

  logger.info(`Product ${req.params.id} deleted`);

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Get Single Product
// const getProductDetails = catchAsyncErrors(async (req, res) => {
//   console.log("Product details called here");
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

const getProductDetails = catchAsyncErrors(async (req, res) => {
  const productId = req.params.id;
  const cacheKey = `product_${productId}`;

  // Check Redis cache
  try {
    const cachedProduct = await redisClient.get(cacheKey);
    if (cachedProduct) {
      logger.info(`Product ${productId} served from Redis`);
      return res.status(200).json({
        success: true,
        message: "Fetched from cache",
        data: JSON.parse(cachedProduct),
      });
    }
  } catch (err) {
    logger.error(`Redis GET failed: ${err.message}`);
  }

  // Fetch product from DB and populate review names
  const product = await Product.findById(productId).populate(
    "reviews.name",
    "name email"
  );

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
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
    await redisClient.set(
      cacheKey,
      JSON.stringify(productWithSpreadReviews),
      "EX",
      3600
    );
  } catch (err) {
    logger.error(`Redis SET failed: ${err.message}`);
  }

  // Update preferences
  if (req.user && req.user._id) {
    updateUserPreferences(req.user._id, {
      productId: product._id,
      category: product.category,
      brand: product.brand,
      tags: product.tags,
    });
  }

  logger.info(`Product ${productId} served from DB`);

  return res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: productWithSpreadReviews,
  });
});

// create new product review or update the review
const createProductReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const product = await Product.findById(productId);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  const existingReview = product.reviews.find(
    (r) => r.name.toString() === req.user._id.toString()
  );

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

  product.ratings =
    product.reviews.reduce((acc, r) => acc + r.rating, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  await redisClient.del(`product_${productId}`);

  logger.info(`Review added/updated for product ${productId}`);

  return res.status(200).json({
    success: true,
    message: "Review added/updated successfully",
    data: product,
  });
});

// get all product review
const getAllReviews = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  return res.status(200).json({
    success: true,
    message: "Reviews fetched successfully",
    data: product.reviews,
  });
});

// delete review
const deleteProductReview = catchAsyncErrors(async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  product.reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.params.id
  );

  product.ratings =
    product.reviews.reduce((acc, r) => acc + r.rating, 0) /
      product.reviews.length || 0;

  product.numOfReviews = product.reviews.length;

  await product.save({ validateBeforeSave: false });
  await redisClient.del(`product_${productId}`);

  logger.info(`Review deleted from product ${productId}`);

  return res.status(200).json({
    success: true,
    message: "Review deleted successfully",
    data: product.reviews,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteProductReview,
  getPaginatedProducts,
};
