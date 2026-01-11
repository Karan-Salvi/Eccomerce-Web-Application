import React, { useState } from 'react';
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
} from 'lucide-react';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
} from '../../store/api/authApi';
import { useSelector } from 'react-redux';
import Share from '../Share/Share';
import PlaceOrderButton from './PlaceOrderButton';

const ProductDetail = ({ product }) => {
  const location = useLocation();
  const fullUrl =
    window.location.origin +
    location.pathname +
    location.search +
    location.hash;

  const { user } = useSelector((state) => state.auth);

  const isInCart = user?.data?.cart?.some(
    (item) => item.productId._id === product._id
  );

  const isInWishlist = user?.data?.wishlist?.some(
    (item) => item._id === product._id
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('orange'); // useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState('sm'); //useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist || false);
  const [activeTab, setActiveTab] = useState('description');

  const order = {
    shippingInfo: {
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pinCode: 400001,
      phoneNo: 9876543210,
    },
    orderItems: [
      {
        price: 499,
        quantity: 2,
        product: '686b37d27944536702caef38',
      },
      {
        price: 799,
        quantity: 1,
        product: '686b37df7944536702caef39',
      },
    ],
    itemsPrice: 1797,
    taxPrice: 150,
    shippingPrice: 50,
    paymentMethod: 'stripe',
  };

  const navigate = useNavigate();

  // const productReviews = [];
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
      white: '#ffffff',
      black: '#000000',
      blue: '#3b82f6',
      red: '#ef4444',
      gray: '#6b7280',
      brown: '#92400e',
      tan: '#d2b48c',
      silver: '#c0c0c0',
      gold: '#ffd700',
      'rose gold': '#e8b4b8',
      tortoise: '#8b4513',
    })[color.toLowerCase()] || '#9ca3af';

  const renderStars = (rating, size = 'md') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClass} ${
              i < Math.floor(rating)
                ? 'fill-current text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const [addToWishlist] = useAddToWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => {
              navigate('/products');
            }}
            className="flex cursor-pointer items-center gap-2 text-gray-600 transition-colors hover:text-orange-600"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={images[selectedImage].url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-medium text-blue-600">
                  {product.brand}
                </span>
                {product.featured && (
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              <div className="mb-4 flex items-center gap-4">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews?.length} reviews)
                </span>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-700">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              <p className="leading-relaxed text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-6">
              {/* Colors */}
              {product.colors && (
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-900">
                    Color: <span className="font-normal">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`h-10 w-10 cursor-pointer rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: getColorStyle(color) }}
                        title={color}
                      >
                        {color.toLowerCase() === 'white' && (
                          <div className="h-full w-full rounded-full border border-gray-200" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-900">
                    Size: <span className="font-normal">{selectedSize}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
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
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Quantity
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-gray-300">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="cursor-pointer p-2 transition-colors hover:bg-gray-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="cursor-pointer p-2 transition-colors hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  disabled={!product.inStock || isInCart}
                  onClick={() => {
                    addToCart({
                      productId: product._id,
                      quantity: quantity,
                      size: selectedSize,
                      color: selectedColor,
                    });
                  }}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700 disabled:bg-orange-400"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isInCart ? 'Already Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => {
                    setIsWishlisted(!isWishlisted);
                    addToWishlist({
                      productId: product._id,
                    });
                  }}
                  className={`cursor-pointer rounded-lg border p-3 transition-all ${
                    isWishlisted
                      ? 'border-red-300 bg-red-50 text-red-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
                <button className="cursor-pointer rounded-lg border border-gray-300 p-3 text-gray-600 transition-colors hover:border-gray-400">
                  <Share url={fullUrl} />
                  {/* <Share2 className="h-5 w-5" /> */}
                </button>
              </div>

              <PlaceOrderButton order={order} />

              <button className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800">
                Buy Now
              </button>
            </div>

            {/* Shipping Info */}
            {product.shippingInfo && (
              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {product.shippingInfo.freeShipping
                        ? 'Free Shipping'
                        : 'Shipping Available'}
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
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="mb-6 leading-relaxed text-gray-600">
                  {product?.description}
                </p>
                {product?.features && (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {product?.features?.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-600" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && product?.specifications && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b border-gray-200 py-3"
                  >
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Customer Reviews
                    </h3>
                    <div className="mt-2 flex items-center gap-4">
                      {renderStars(product.ratings)}
                      <span className="text-sm text-gray-600">
                        Based on {product.reviews?.length || 0} reviews
                      </span>
                    </div>
                  </div>
                  <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                    Write a Review
                  </button>
                </div>

                <div className="space-y-6">
                  {product?.reviews &&
                    product?.reviews?.map((review, index) => (
                      // <div
                      //   key={index}
                      //   className="bg-white rounded-lg p-6 shadow-sm border"
                      // >
                      //   <div className="flex items-start gap-4">
                      //     <img
                      //       src={`/images/profile.png`}
                      //       alt={review?.name?.name || "User"}
                      //       className="w-12 h-12 rounded-full object-cover"
                      //     />
                      //     <div className="flex-1">
                      //       <div className="flex items-center justify-between mb-2">
                      //         <div>
                      //           <h4 className="font-medium text-gray-900">
                      //             {review?.name?.name || "User Name"}
                      //           </h4>
                      //           <div className="flex items-center gap-2 mt-1">
                      //             {renderStars(review?.rating || 0, "sm")}
                      //           </div>
                      //         </div>
                      //       </div>
                      //       <p className="text-gray-600 mb-4">
                      //         {review.comment}
                      //       </p>
                      //       <div className="flex items-center gap-4 text-sm">
                      //         <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                      //           <ThumbsUp className="h-4 w-4" />
                      //           Helpful
                      //         </button>
                      //         <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                      //           <MessageCircle className="h-4 w-4" />
                      //           Reply
                      //         </button>
                      //       </div>
                      //     </div>
                      //   </div>
                      // </div>

                      <div
                        key={index}
                        className="rounded-md border bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={`/images/profile.png`}
                            alt={review?.user?.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="mb-2 flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {review?.user?.name || 'User Name'}
                                </h4>
                                <div className="mt-1 flex items-center gap-2">
                                  {renderStars(review?.rating, 'sm')}
                                  <span className="text-sm text-gray-500">
                                    {/* {review.date || "Date"} */}
                                  </span>
                                  {review.verified && (
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                                      Verified Purchase
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <h5 className="mb-2 font-medium text-gray-900">
                              {review.title}
                            </h5>
                            <p className="mb-4 text-gray-600">
                              {review.comment}
                            </p>
                            {review.images && (
                              <div className="mb-4 flex gap-2">
                                {review.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={`Review ${index + 1}`}
                                    className="h-16 w-16 rounded-lg object-cover"
                                  />
                                ))}
                              </div>
                            )}
                            {/* <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                                <ThumbsUp className="h-4 w-4" />
                                Helpful ({review.helpful || 0})
                              </button>
                              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                                <MessageCircle className="h-4 w-4" />
                                Reply
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* {productReviews.length > 3 && (
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
                )} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
