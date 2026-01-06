const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserDetails,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updatePersonalDetails,
  DeleteUser,
  updateUserRole,
  addtoWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} = require("./user.controller.js");
const {
  checkAuthenticated,
} = require("../../shared/middlewares/authentication.js");

const router = express.Router();

router.route("/register").post(registerUser); // done

router.route("/login").post(loginUser); // done

router.route("/password/forgot").post(forgetPassword); // done

router.route("/password/reset/:token").put(resetPassword); // done

router.route("/logout").get(checkAuthenticated(), logoutUser); // done

router.route("/update/:id").put(checkAuthenticated(), updateUserDetails); // done

router.route("/me").get(checkAuthenticated(), getUserDetails); // done

router.route("/password/update").put(checkAuthenticated(), updatePassword); // done

router.route("/me/update").put(checkAuthenticated(), updatePersonalDetails);

router.route("/user/delete/:id").delete(checkAuthenticated(), DeleteUser); // done

router.route("/user/updateRole/:id").put(checkAuthenticated(), updateUserRole); // done

router
  .route("/user/wishlist")
  .post(checkAuthenticated(), addtoWishlist)
  .delete(checkAuthenticated(), removeFromWishlist);

router
  .route("/user/cart")
  .post(checkAuthenticated(), addToCart)
  .delete(checkAuthenticated(), removeFromCart);

module.exports = router;
