import express from "express";
import {
  authorizeRoles,
  checkAuthenticated,
} from "#shared/middlewares/authentication.js";
import upload from "#shared/middlewares/multer.js";
import preferenceAuth from "#shared/middlewares/preferenceAuth.js";
import validate from "#shared/middlewares/validate.js";
import {
  createProductSchema,
  updateProductSchema,
  createReviewSchema,
  getReviewsSchema,
  deleteReviewSchema,
  paginationSchema,
} from "#modules/products/product.validation.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteProductReview,
  getPaginatedProducts,
} from "#modules/products/product.controller.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product").get(validate(paginationSchema), getPaginatedProducts);

router
  .route("/product/new")
  .post(
    upload.fields([{ name: "image", maxCount: 5 }]),
    validate(createProductSchema),
    createProduct
  );

router
  .route("/product/:id")
  .put(validate(updateProductSchema), updateProduct)
  .delete(deleteProduct)
  .get(preferenceAuth(), getProductDetails);

router
  .route("/review")
  .put(checkAuthenticated(), validate(createReviewSchema), createProductReview);

router.route("/reviews/:id").get(validate(getReviewsSchema), getAllReviews);

router
  .route("/review/delete/:id")
  .delete(validate(deleteReviewSchema), deleteProductReview);

export default router;
