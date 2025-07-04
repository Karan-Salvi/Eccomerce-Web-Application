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
} = require("../controllers/user.controller.js");
const { checkAuthenticated } = require("../middlewares/authentication.js");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(checkAuthenticated(), logoutUser);

router.route("/update/:id").put(checkAuthenticated(), updateUserDetails);

router.route("/me").get(checkAuthenticated(), getUserDetails);

router.route("/password/update").put(checkAuthenticated(), updatePassword);

router.route("/me/update").put(checkAuthenticated(), updatePersonalDetails);

router.route("/user/delete/:id").delete(checkAuthenticated(), DeleteUser);

router.route("/user/updateRole/:id").put(checkAuthenticated(), updateUserRole);

module.exports = router;
