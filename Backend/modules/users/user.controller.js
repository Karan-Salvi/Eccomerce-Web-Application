import crypto from 'crypto';

import mongoose from 'mongoose';

import catchAsyncErrors from '#shared/middlewares/catchAsyncErrors.js';
import User from '#modules/users/user.model.js';
import sendEmail from '#shared/utils/sendmail.js';
import logger from '#infra/logger/logger.js';
import Product from '#modules/products/product.model.js';

// Register or Sign up new User
export const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    logger.warn('User not created something went wrong.');
    return res.status(500).json({
      success: false,
      message: 'User not created something went wrong.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User is registered successfully',
  });
});

// Login user in our web app
export const loginUser = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    logger.warn('User not found with this email');
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const checkUser = await user.isPasswordCorrect(password);

  if (!checkUser) {
    logger.warn('Password is incorrect');
    return res.status(500).json({
      success: false,
      message: 'Password is incorrect',
    });
  }

  const token = await user.generateRefreshToken();

  if (!token) {
    logger.warn('Token creation failed');
    return res.status(500).json({
      success: false,
      message: 'token not created something went wrong.',
    });
  }

  const isProduction = process.env.NODE_ENV === 'production';

  return res
    .status(200)
    .cookie(process.env.TOKEN_NAME, token, {
      path: '/',
      sameSite: isProduction ? 'None' : 'Lax',
      secure: isProduction,
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: 'User is successfully logged in.',
      data: user,
    });
});

// Logout user in our web app
export const logoutUser = catchAsyncErrors(async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  logger.info('User is logged out successfully');
  return res
    .clearCookie(process.env.TOKEN_NAME, {
      path: '/',
      sameSite: isProduction ? 'None' : 'Lax',
      secure: isProduction,
      httpOnly: true,
    })
    .status(201)
    .json({
      success: true,
      message: 'User is logged out successfully',
    });
});

// Update user details -- ADMIN
export const updateUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    logger.warn('User not found');
    return res.status(404).json({
      success: true,
      message: 'User not found',
    });
  }

  const { name, email } = req.body;

  const updateUser = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      name: name,
      email: email,
    },
  }).select('-password');

  if (!updateUser) {
    logger.warn('Something went wrong while updating user details');
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User is updated successfully',
    data: updateUser,
  });
});

// forget password
export const forgetPassword = catchAsyncErrors(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found ',
    });
  }

  // get reset password

  const resetToken = await user.getResetPassword();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password token is :-\n\n${resetPasswordUrl}\n\nIf you are not requested this email then please ignore this mail.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'TrendyCart password recovery',
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
      message: 'Something went wrong ',
      error: error,
    });
  }
});

// reset users password
export const resetPassword = catchAsyncErrors(async (req, res) => {
  const token = req.params.token;

  const { password, confirmPassword } = req.body;

  const resetPasswordToken = await crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Reset Password token is invalid or has been expired',
    });
  }

  if (password !== confirmPassword) {
    return res.status(401).json({
      success: false,
      message: 'Please enter password and confirm password',
    });
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

// get user personal details
export const getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('-password -resetPasswordToken -resetPasswordExpiry')
    .populate('wishlist')
    .populate('cart.productId');

  if (!user) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong ',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User details are fetched successfully',
    data: user,
  });
});

// Update users password
export const updatePassword = catchAsyncErrors(async (req, res) => {
  const { password, oldPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isPasswordMatched = await user.isPasswordCorrect(oldPassword);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: 'User not found',
    });
  }

  if (!isPasswordMatched) {
    return res.status(500).json({
      success: false,
      message: 'Old password is incorrect.Please enter correct password ',
    });
  }

  if (password !== confirmPassword) {
    return res.status(500).json({
      success: false,
      message: 'Password and Confirm password should be same.',
    });
  }

  user.password = password;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});

// update personal details
export const updatePersonalDetails = catchAsyncErrors(async (req, res) => {
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
      message: 'Something went wrong',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User details updated successfully',
    data: user,
  });
});

// Get all users details -- ADMIN
export const getAllUsersDetail = catchAsyncErrors(async (req, res) => {
  const users = await find();
  return res.status(200).json({
    success: true,
    message: 'All user fetch successfully',
    data: users,
  });
});

// get single user details
export const getSingleUserDetail = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
});

// update user Role -- ADMIN
export const updateUserRole = catchAsyncErrors(async (req, res) => {
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
      message: 'Something went wrong',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User Role updated successfully',
    data: user,
  });
});

// Delete user
export const DeleteUser = catchAsyncErrors(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User does not exist',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: user,
  });
});

export const addAddress = catchAsyncErrors(async (req, res) => {
  const { address, city, state, country, pinCode, phoneNo } = req.body;
  const userId = req?.user?._id;

  if (!userId) {
    logger.warn('User not found');
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }

  const user = await User.findById(userId);
  const addressInformation = {
    address,
    city,
    state,
    country,
    pinCode,
    phoneNo,
  };

  user.addressInfo.push_back(addressInformation);

  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Address updated successfully',
  });
});

export const deleteAddress = catchAsyncErrors(async (req, res) => {
  const { addressId } = req.body;
  const userId = req?.user?._id;

  if (!userId) {
    logger.warn('User not found');
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    logger.error('User not found');
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    logger.error('Invalid address ID');
    return res.status(400).json({
      success: false,
      message: 'Invalid address ID',
    });
  }

  user.addressInfo = user.addressInfo.filter((address) => address._id !== addressId);

  await user.save();

  logger.info(`Address ${addressId} deleted for user ${userId}`);

  return res.status(200).json({
    success: true,
    message: 'Address deleted successfully',
  });
});

export const updateAddress = catchAsyncErrors(async (req, res) => {
  const { address, city, state, country, pinCode, phoneNo, addressId } = req.body;
  const userId = req?.user?._id;

  if (!userId) {
    logger.warn('User not found');
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    logger.error('User not found');
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    logger.error('Invalid address ID');
    return res.status(400).json({
      success: false,
      message: 'Invalid address ID',
    });
  }

  user.addressInfo = user.addressInfo.filter((address) => address._id !== addressId);

  await user.save();

  logger.info(`Address ${addressId} deleted for user ${userId}`);

  return res.status(200).json({
    success: true,
    message: 'Address deleted successfully',
  });
});

export const addToWishlist = catchAsyncErrors(async (req, res) => {
  const { productId } = req.body;
  const userId = req?.user?._id;

  if (!userId) {
    logger.warn('User not found');
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    logger.error('User not found');
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  // Check if the product is already in the wishlist
  if (user.wishlist.includes(productId)) {
    return res.status(200).json({
      success: true,
      message: 'Product already in wishlist',
    });
  }

  // Add product to wishlist
  user.wishlist.push(productId);
  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Product added to wishlist successfully',
  });
});

export const removeFromWishlist = catchAsyncErrors(async (req, res) => {
  const { productId } = req.body;
  const userId = req?.user?._id;

  if (!userId) {
    logger.warn('User not found');
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    logger.error('User not found');
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  user.wishlist = user.wishlist.filter((id) => id !== productId);

  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Product removed from wishlist successfully',
  });
});

// const addToCart = catchAsyncErrors(async (req, res) => {
//   // const { productId, quantity, size, color } = req.body;
//   // const userId = req?.user?._id;

//   // if (!userId) {
//   //   logger.warn("User not found");
//   //   return res.status(400).json({
//   //     success: false,
//   //     message: "User not found",
//   //   });
//   // }

//   // const user = await User.findById(userId);

//   // if (!user) {
//   //   logger.error("User not found");
//   //   return res.status(404).json({
//   //     success: false,
//   //     message: "User not found",
//   //   });
//   // }

//   // const cartItem = {
//   //   productId,
//   //   quantity,
//   //   variant: {
//   //     size,
//   //     color,
//   //   },
//   //   addedAt: Date.now(),
//   // };

//   // user.cart.push(cartItem);

//   // await user.save();

//   // return res.status(200).json({
//   //   success: true,
//   //   message: "Product added to cart successfully",
//   // });

//   const { productId, quantity, size, color } = req.body;
//   const userId = req?.user?._id;

//   if (!userId) {
//     logger.warn("User not found");
//     return res.status(400).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   const user = await User.findById(userId);

//   if (!user) {
//     logger.error("User not found");
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   const productObjectId = new mongoose.Types.ObjectId(productId);

//   const existingItem = user.cart.find(
//     (item) =>
//       item.productId.equals(productObjectId) &&
//       item.variant.size === size &&
//       item.variant.color === color
//   );

//   if (existingItem) {
//     // Overwrite quantity instead of incrementing
//     existingItem.quantity = quantity;
//     existingItem.addedAt = Date.now(); // Optional
//   } else {
//     user.cart.push({
//       productId: productObjectId,
//       quantity,
//       variant: { size, color },
//       addedAt: Date.now(),
//     });
//   }

//   await user.save();

//   return res.status(200).json({
//     success: true,
//     message: "Product added to cart successfully",
//   });
// });

export const addToCart = catchAsyncErrors(async (req, res) => {
  const { productId, quantity, size, color } = req.body;
  const userId = req?.user?._id;

  if (!userId) {
    logger.warn('User not found');
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid product or quantity' });
  }

  const user = await User.findById(userId);
  if (!user) {
    logger.error('User not found');
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const product = await Product.findById(productId); // optional but good
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const productObjectId = new mongoose.Types.ObjectId(productId);

  const existingItem = user.cart.find(
    (item) =>
      item.productId.equals(productObjectId) &&
      item.variant?.size === size &&
      item.variant?.color === color
  );

  if (existingItem) {
    existingItem.quantity = quantity;
    existingItem.addedAt = Date.now();
  } else {
    user.cart.push({
      productId: productObjectId,
      quantity,
      variant: { size, color },
      addedAt: Date.now(),
    });
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Product added to cart successfully',
  });
});

export const removeFromCart = catchAsyncErrors(async (req, res) => {
  const { productId } = req.body;

  const userId = req?.user?._id;

  if (!userId) {
    logger.warn('User not found');
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    logger.error('User not found');
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  // user.cart = user.cart.filter((item) => item._id !== productId);

  user.cart = user.cart.filter((item) => !item._id.equals(productId));

  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Product removed from cart successfully',
  });
});
