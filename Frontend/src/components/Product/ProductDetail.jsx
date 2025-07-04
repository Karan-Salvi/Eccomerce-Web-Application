import React, { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  ThumbsUp,
  Share2,
  MessageCircle,
} from "lucide-react";

import { reviews } from "../../data/reviews";

const ProductDetail = ({ product, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("orange"); // useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState("sm"); //useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const productReviews = reviews[product.id] || [];
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const images = product.images || [product.image];

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const getColorStyle = (color) =>
    ({
      white: "#ffffff",
      black: "#000000",
      blue: "#3b82f6",
      red: "#ef4444",
      gray: "#6b7280",
      brown: "#92400e",
      tan: "#d2b48c",
      silver: "#c0c0c0",
      gold: "#ffd700",
      "rose gold": "#e8b4b8",
      tortoise: "#8b4513",
    }[color.toLowerCase()] || "#9ca3af");

  const renderStars = (rating, size = "md") => {
    const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClass} ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === index
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-blue-600 font-medium">
                  {product.brand}
                </span>
                {product.featured && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-6">
              {/* Colors */}
              {product.colors && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Color: <span className="font-normal">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                          selectedColor === color
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: getColorStyle(color) }}
                        title={color}
                      >
                        {color.toLowerCase() === "white" && (
                          <div className="w-full h-full rounded-full border border-gray-200" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Size: <span className="font-normal">{selectedSize}</span>
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          selectedSize === size
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-gray-400 text-gray-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-50 transition-colors cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isWishlisted
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-gray-300 hover:border-gray-400 text-gray-600"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 text-gray-600 transition-colors cursor-pointer">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors cursor-pointer">
                Buy Now
              </button>
            </div>

            {/* Shipping Info */}
            {product.shippingInfo && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {product.shippingInfo.freeShipping
                        ? "Free Shipping"
                        : "Shipping Available"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {product.shippingInfo.estimatedDays}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">
                      {product.shippingInfo.returnPolicy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">
                      Your payment information is protected
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                {product.features && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "specifications" && product.specifications && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-3 border-b border-gray-200"
                  >
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      {renderStars(product.rating)}
                      <span className="text-sm text-gray-600">
                        Based on {product.reviews} reviews
                      </span>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                    Write a Review
                  </button>
                </div>

                <div className="space-y-6">
                  {productReviews
                    .slice(0, showAllReviews ? productReviews.length : 3)
                    .map((review) => (
                      <div
                        key={review.id}
                        className="bg-white rounded-lg p-6 shadow-sm border"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={
                              review.userAvatar ||
                              `https://ui-avatars.com/api/?name=${review.userName}&background=random`
                            }
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {review.userName}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  {renderStars(review.rating, "sm")}
                                  <span className="text-sm text-gray-500">
                                    {review.date}
                                  </span>
                                  {review.verified && (
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                      Verified Purchase
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <h5 className="font-medium text-gray-900 mb-2">
                              {review.title}
                            </h5>
                            <p className="text-gray-600 mb-4">
                              {review.comment}
                            </p>
                            {review.images && (
                              <div className="flex gap-2 mb-4">
                                {review.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={`Review ${index + 1}`}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                                <ThumbsUp className="h-4 w-4" />
                                Helpful ({review.helpful})
                              </button>
                              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                                <MessageCircle className="h-4 w-4" />
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {productReviews.length > 3 && (
                  <div className="text-center">
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                    >
                      {showAllReviews
                        ? "Show Less"
                        : `Show All ${productReviews.length} Reviews`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
