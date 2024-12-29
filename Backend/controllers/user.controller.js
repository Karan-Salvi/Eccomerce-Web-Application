const exp = require("constants");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const User = require("../models/user.model.js");
const sendEmail = require("../utils/sendmail.js");
const crypto = require("crypto");

// Register or Sign up new User
const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User not created something went wrong.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User is registered successfully",
    data: user,
  });
});

// Login user in our web app
const loginUser = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const checkUser = await user.isPasswordCorrect(password);

  if (!checkUser) {
    return res.status(500).json({
      success: false,
      message: "Password is incorrect",
    });
  }

  const token = await user.generateRefreshToken();

  if (!token) {
    return res.status(500).json({
      success: false,
      message: "token not created something went wrong.",
    });
  }

  const domain =
    process.env.NODE_ENV === "production" ? ".vercel.app" : undefined;

  return res
    .status(200)
    .cookie(process.env.TOKEN_NAME, token, {
      path: "/",
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: "User is successfully logged in.",
      data: user,
    });
});

// Logout user in our web app
const logoutUser = catchAsyncErrors(async (req, res) => {
  return res
    .clearCookie(process.env.TOKEN_NAME, {
      path: "/",
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .status(201)
    .json({
      success: true,
      message: "User is logged out successfully",
    });
});

// Update user deatails -- ADMIN
const updateUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: true,
      message: "User not found",
    });
  }

  const { name, email } = req.body;

  const updateUser = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      name: name,
      email: email,
    },
  }).select("-password");

  return res.status(200).json({
    success: true,
    message: "User is updated successfully",
    data: updateUser,
  });
});

// forget password
const forgetPassword = catchAsyncErrors(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found ",
    });
  }

  // get reset password

  const resetToken = await user.getResetPassword();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password token is :-\n\n${resetPasswordUrl}\n\nIf you are not requested this email then please ingore this mail.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "TrendyCart password recovery",
      message: message,
    });
    return res.status(200).json({
      success: true,
      message: `Email sent to ${email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({
      success: false,
      message: "Something went wrong ",
      error: error,
    });
  }
});

// reset users password
const resetPassword = catchAsyncErrors(async (req, res) => {
  const token = req.params.token;

  const { password, confirmPassword } = req.body;

  const resetPasswordToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Reset Password token is invalid or has been expired",
    });
  }

  if (password !== confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Please enter password and confirm password",
    });
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// get user personal details
const getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong ",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User details are fetched successfully",
    data: user,
  });
});

// Update users password
const updatePassword = catchAsyncErrors(async (req, res) => {
  const { password, oldPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isPasswordMatched = await user.isPasswordCorrect(oldPassword);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User not found",
    });
  }

  if (!isPasswordMatched) {
    return res.status(500).json({
      success: false,
      message: "Old password is incorrect.Please enter correct password ",
    });
  }

  if (password !== confirmPassword) {
    return res.status(500).json({
      success: false,
      message: "Password and Confirm password should be same.",
    });
  }

  user.password = password;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Password upadated successfully",
  });
});

// update personal details
const updatePersonalDetails = catchAsyncErrors(async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        name,
        email,
      },
    },
    { new: true }
  );

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User details updated successfully",
    data: user,
  });
});

// Get all users details -- ADMIN
const getAllusersDetail = catchAsyncErrors(async (req, res) => {
  const users = await find();
  return res.status(200).json({
    success: true,
    message: "All user fetch successfully",
    data: users,
  });
});

// get single user details
const getSingaluserDetail = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

// upadate user Role -- ADMIN
const updateUserRole = catchAsyncErrors(async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      name,
      email,
      role,
    },
  });

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User Role updated successfully",
    data: user,
  });
});

// Delete user
const DeleteUser = catchAsyncErrors(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUserDetails,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updatePersonalDetails,
  updateUserRole,
  DeleteUser,
};
