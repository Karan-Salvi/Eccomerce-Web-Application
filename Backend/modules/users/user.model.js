import crypto from 'crypto';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter your name'],
      maxLength: [30, 'Please Enter the valid name'],
      minLength: [4, 'Name should have more than 5 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'Password should have more than 6 characters'],
    },
    avatar: {
      type: String,
      default: '../public/images/default.png',
    },
    role: {
      type: String,
      default: 'user',
    },
    addressInfo: [
      {
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        pinCode: {
          type: Number,
          required: true,
        },
        phoneNo: {
          type: Number,
          required: true,
        },
      },
    ],

    // User preferences
    preferences: {
      viewedProducts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      ],
      categories: [
        {
          type: String,
        },
      ],
      brands: [
        {
          type: String,
        },
      ],
      tags: [
        {
          type: String,
        },
      ],
      lastViewedAt: Date,
    },

    // User wishlist and cart
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        variant: {
          size: { type: String }, // Optional: like "M", "L", etc.
          color: { type: String }, // Optional: like "Red", "Blue"
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.getResetPassword = async function () {
  // Generating token
  const resetToken = await crypto.randomBytes(20).toString('hex');

  // Hashing and adding reset password token to userschema

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
