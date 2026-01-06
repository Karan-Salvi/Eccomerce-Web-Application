const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteProductReview,
  getPaginatedProducts,
} = require("./product.controller.js");
const {
  authorizeRoles,
  checkAuthenticated,
} = require("../../shared/middlewares/authentication.js");
const upload = require("../../shared/middlewares/multer.js");
const preferenceAuth = require("../../shared/middlewares/preferenceAuth.js");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product").get(getPaginatedProducts);

router
  .route("/product/new")
  .post(upload.fields([{ name: "image", maxCount: 5 }]), createProduct);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(preferenceAuth(), getProductDetails);

router.route("/review").put(checkAuthenticated(), createProductReview);

router.route("/reviews/:id").get(getAllReviews);

router.route("/review/delete/:id").delete(deleteProductReview);

module.exports = router;
