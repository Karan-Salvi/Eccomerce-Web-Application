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
} = require("../controllers/product.controller.js");
const {
  authorizeRoles,
  checkAuthenticated,
} = require("../middlewares/authentication.js");
const upload = require("../middlewares/multer.js");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/product/new")
  .post(upload.fields([{ name: "image", maxCount: 5 }]), createProduct);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

router.route("/review").put(createProductReview);

router.route("/reviews/:id").get(getAllReviews);

router.route("/review/delete/:id").delete(deleteProductReview);

module.exports = router;
