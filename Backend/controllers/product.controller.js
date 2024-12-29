const Product = require("../models/product.model.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

// create products -- admin

const createProduct = catchAsyncErrors(async (req, res) => {
  const image1 = await uploadOnCloudinary(req.files["image"][0].path);
  const image2 = await uploadOnCloudinary(req.files["image"][1].path);
  const image3 = await uploadOnCloudinary(req.files["image"][2].path);
  const image4 = await uploadOnCloudinary(req.files["image"][3].path);
  const image5 = await uploadOnCloudinary(req.files["image"][4].path);

  const images = [
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image4 },
    { url: image5 },
  ];

  const { name, description, price, ratings, category, stock } = req.body;



  const product = await Product.create({
    name,
    description,
    price,
    ratings,
    category,
    stock,
    images,
  });

  res.status(201).json({
    success: true,
    message: "Product is created successfully",
    data: product,
  });
});

// Get all the products
const getAllProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();
  return res.json({
    success: true,
    message: "All products are fetched successfully",
    data: products,
  });
});

// update Product -- Admin

const updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

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
    return res.status(500).json({
      success: false,
      message: "Product is not found",
    });
  }

  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: deletedProduct,
  });
});

// get one products details

const getProductDetails = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product is not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: product,
  });
});

// create new product review or update the review

const createProductReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const productReview = {
    name: req.user._id,
    rating: Number(rating),
    comment: comment,
    createdBy: req.user.name,
  };

  const product = await Product.findById(productId);

  let isReviewed = 0;

  product.reviews.forEach((review) => {
    if (review.name.toString() === req.user._id.toString()) {
      isReviewed = isReviewed + 1;
    }
  });



  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.name.toString() === req.user._id.toString()) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(productReview);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((review) => {
    avg += review.rating;
  });

  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Review Added Successfully",
    data: product,
  });
});

// get all product review
const getAllReviews = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product review fetched sucessfully",
    data: product.reviews,
  });
});

// delete review
const deleteProductReview = catchAsyncErrors(async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  let Review = product.reviews.filter(
    (review) => review._id.toString() !== req.params.id.toString()
  );

  product.reviews = Review;
  let avg = 0;

  product.reviews.forEach((review) => {
    avg += review.rating;
  });

  product.ratings = avg / product.reviews.length;

  product.numOfReviews = product.reviews.length;

  await product.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Product review deleted sucessfully",
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
};
