import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  Plus,
  Minus,
  Check,
} from 'lucide-react';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
} from '../../store/api/authApi';
import { useGetSimilarProductsQuery } from '../../store/api/recommendationApi';
import { useSelector } from 'react-redux';
import Share from '../Share/Share';
import PlaceOrderButton from './PlaceOrderButton';
import AddAddressDialog from './AddAddressDialog';
import ReviewDialog from './ReviewDialog';
import { ProductCard } from '../Products/ProductCard';
import { Reveal } from '../Home/Reveal';
import { getProductColorHex } from '../../constants/productColors.constants';

const TABS = ['description', 'specifications', 'reviews'];

const ProductDetail = ({ product }) => {
  const location = useLocation();
  const fullUrl =
    window.location.origin +
    location.pathname +
    location.search +
    location.hash;

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isInCart = user?.data?.cart?.some(
    (item) => item.productId?._id === product._id
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

  // A saved address (from the user's account) or one just entered in the
  // dialog below — either is enough to build a real order. Kept separate
  // from redux user state so checkout can proceed immediately after saving,
  // without waiting on a user-refetch that nothing in the app currently triggers.
  const [pendingAddress, setPendingAddress] = useState(null);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const savedAddress = user?.data?.addressInfo?.[0];
  const shippingAddress = pendingAddress || savedAddress;

  const itemsPrice = Number((product.price * quantity).toFixed(2));

  const order = shippingAddress
    ? {
        shippingInfo: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          country: shippingAddress.country,
          pinCode: Number(shippingAddress.pinCode),
          phoneNo: Number(shippingAddress.phoneNo),
        },
        orderItems: [
          {
            price: product.price,
            quantity,
            product: product._id,
          },
        ],
        itemsPrice,
        taxPrice: 0,
        shippingPrice: 0,
        paymentMethod: 'stripe',
      }
    : null;

  const navigate = useNavigate();

  const { data: similarProductsData, isLoading: isLoadingSimilar } = useGetSimilarProductsQuery(product._id, {
    skip: !product._id,
  });

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ url: product.image || 'https://placehold.co/400' }];

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const getColorStyle = getProductColorHex;

  const renderStars = (rating, size = 'md') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex items-center" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClass} ${
              i < Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-zinc-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const [addToWishlist] = useAddToWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            navigate('/products');
          }}
          className="flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-amber-600"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <Reveal className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-[20px] bg-white ring-1 ring-zinc-200">
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
                    aria-label={`Show image ${index + 1} of ${product.name}`}
                    className={`h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === index
                        ? 'border-amber-600 ring-2 ring-amber-100'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          {/* Product Info */}
          <Reveal delay={0.08} className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-semibold text-amber-600">
                  {product.brand}
                </span>
                {product.featured && (
                  <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900">
                {product.name}
              </h1>

              <div className="mb-4 flex items-center gap-3">
                {renderStars(product.ratings)}
                <span className="text-sm text-zinc-600">
                  {product.ratings ?? 0} ({product.numOfReviews ?? product.reviews?.length ?? 0} reviews)
                </span>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold text-zinc-900">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-zinc-400 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-red-500 px-2.5 py-1 text-sm font-semibold text-white">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              <p className="leading-relaxed text-zinc-600">
                {product.description}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-6">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-medium text-zinc-900">
                    Color: <span className="font-normal text-zinc-600">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select color ${color}`}
                        className={`h-10 w-10 cursor-pointer rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-amber-600 ring-2 ring-amber-100'
                            : 'border-zinc-300 hover:border-zinc-400'
                        }`}
                        style={{ backgroundColor: getColorStyle(color) }}
                        title={color}
                      >
                        {color.toLowerCase() === 'white' && (
                          <div className="h-full w-full rounded-full border border-zinc-200" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-medium text-zinc-900">
                    Size: <span className="font-normal text-zinc-600">{selectedSize}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-amber-600 bg-amber-50 text-amber-700'
                            : 'border-zinc-300 text-zinc-700 hover:border-zinc-400'
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
                <h3 className="mb-3 text-sm font-medium text-zinc-900">
                  Quantity
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-zinc-300">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="cursor-pointer rounded-l-full p-2.5 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2.5rem] px-2 text-center font-medium text-zinc-900" aria-live="polite">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="cursor-pointer rounded-r-full p-2.5 transition-colors hover:bg-zinc-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className={`text-sm font-medium ${product.inStock ? 'text-emerald-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex gap-3">
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
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
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
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`cursor-pointer rounded-full border p-3 transition-all ${
                    isWishlisted
                      ? 'border-red-300 bg-red-50 text-red-600'
                      : 'border-zinc-300 text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
                <Share
                  url={fullUrl}
                  className="cursor-pointer rounded-full border border-zinc-300 p-3 text-zinc-600 transition-colors hover:border-zinc-400"
                />
              </div>

              {order ? (
                <PlaceOrderButton order={order} />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddressDialog(true)}
                  className="h-12 w-full cursor-pointer rounded-full bg-amber-600 text-base font-semibold text-white transition-colors hover:bg-amber-700"
                >
                  Add shipping address to buy
                </button>
              )}
            </div>

            {/* Shipping Info */}
            {product.shippingInfo && (
              <div className="space-y-4 rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
                    <Truck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">
                      {product.shippingInfo.freeShipping
                        ? 'Free Shipping'
                        : 'Shipping Available'}
                    </p>
                    <p className="text-sm text-zinc-600">
                      Estimated delivery: {product.shippingInfo.estimatedDays}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
                    <RotateCcw className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">Easy Returns</p>
                    <p className="text-sm text-zinc-600">
                      {product.shippingInfo.returnPolicy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
                    <Shield className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">Secure Payment</p>
                    <p className="text-sm text-zinc-600">
                      Your payment information is protected
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Reveal>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-zinc-200">
            <nav className="flex space-x-8">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-amber-600 text-amber-600'
                      : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-none">
                <p className="mb-6 max-w-[70ch] leading-relaxed text-zinc-600">
                  {product?.description}
                </p>
                {product?.features && (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-zinc-900">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {product?.features?.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                          <span className="text-zinc-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && product?.specifications && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200"
                  >
                    <p className="text-xs font-medium tracking-wide text-zinc-500">{key}</p>
                    <p className="mt-1 text-base font-semibold text-zinc-900">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">
                      Customer Reviews
                    </h3>
                    <div className="mt-2 flex items-center gap-4">
                      {renderStars(product.ratings)}
                      <span className="text-sm text-zinc-600">
                        Based on {product.reviews?.length || 0} reviews
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate('/login');
                        return;
                      }
                      setShowReviewDialog(true);
                    }}
                    className="cursor-pointer rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-amber-600 hover:text-amber-600"
                  >
                    Write a Review
                  </button>
                </div>

                {product?.reviews?.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={`/images/profile.png`}
                            alt=""
                            className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <h4 className="font-medium text-zinc-900">
                                {review?.user?.name || 'User Name'}
                              </h4>
                              {review.verified && (
                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            {renderStars(review?.rating, 'sm')}
                            {review.title && (
                              <h5 className="mt-2 font-medium text-zinc-900">
                                {review.title}
                              </h5>
                            )}
                            <p className="mt-2 text-zinc-600">
                              {review.comment}
                            </p>
                            {review.images && (
                              <div className="mt-4 flex gap-2">
                                {review.images.map((image, imgIndex) => (
                                  <img
                                    key={imgIndex}
                                    src={image}
                                    alt=""
                                    className="h-16 w-16 rounded-xl object-cover"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-600">No reviews yet. Be the first to share your thoughts.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* You may also like */}
      {!isLoadingSimilar && similarProductsData?.data?.length > 0 && (
        <div className="border-t border-zinc-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                {similarProductsData.source === 'cooccurrence'
                  ? 'Customers who bought this also bought'
                  : 'You may also like'}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similarProductsData.data.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </Reveal>
          </div>
        </div>
      )}

      <AddAddressDialog
        open={showAddressDialog}
        onOpenChange={setShowAddressDialog}
        onSaved={(address) => {
          setPendingAddress(address);
          setShowAddressDialog(false);
        }}
      />

      <ReviewDialog
        open={showReviewDialog}
        onOpenChange={setShowReviewDialog}
        productId={product._id}
        productName={product.name}
      />
    </div>
  );
};

export default ProductDetail;
