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

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/update/:id").put(updateUserDetails);

router.route("/me").get(getUserDetails);

router.route("/password/update").put(updatePassword);

router.route("/me/update").put(updatePersonalDetails);

router.route("/user/delete/:id").delete(DeleteUser);

router.route("/user/updateRole/:id").put(updateUserRole);

module.exports = router;
