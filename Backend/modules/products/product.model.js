import mongoose from "mongoose";

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Books & Stationery",
  "Sports & Fitness",
  "Toys & Baby Products",
  "Automotive",
  "Grocery & Daily Essentials",
  "Health & Wellness",
  "Digital Products",
  "Gifts & Seasonal Items",
  "Handmade & Local Products",
  "Pet Supplies",
  "Industrial & B2B Products",
];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter product price"],
      maxLength: [8, "Price cannot exceed 8 characters"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Please Enter product original price"],
      maxLength: [8, "Price cannot exceed 8 characters"],
    },
    ratings: {
      type: Number,
      default: 5,
    },
    sizes: [
      {
        type: String,
      },
    ],
    brand: {
      type: String,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    featured: {
      type: Boolean,
      default: true,
    },

    category: {
      type: String,
      required: [true, "Please Enter product category"],
      enum: {
        values: PRODUCT_CATEGORIES,
        message: "Please select a valid product category",
      },
    },
    inStock: {
      type: Number,
      required: true,
      maxLength: [4, "Stock can not exceed 4 characters"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    colors: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        name: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          /*type: string,
          required: true, If you got error then do this */
        },
        createdBy: {
          type: String,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
