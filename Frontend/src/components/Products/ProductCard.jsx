import React, { useEffect, useState } from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
} from '../../store/api/authApi';
import { useSelector } from 'react-redux';
// import ProductDetail from "../../components/Product";

export const ProductCard = ({ product, setSelectedProduct }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const isInWishlist = user?.data?.wishlist?.some(
      (item) => item._id.toString() === product._id.toString()
    );
    if (isInWishlist) {
      setIsWishlisted(true);
    }
  }, [user, product._id]);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const [addToWishlist] = useAddToWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  return (
    <div
      className="group relative overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product?.images[0]?.url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.featured && (
            <span className="rounded-md bg-purple-500 px-2 py-1 text-xs font-medium text-white">
              Featured
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-md bg-gray-500 px-2 py-1 text-xs font-medium text-white">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => {
            setIsWishlisted(!isWishlisted);
            addToWishlist({
              productId: product._id,
            });
          }}
          className={`absolute top-3 right-3 cursor-pointer rounded-full p-2 transition-all duration-200 ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions */}
        <div
          className={`absolute right-3 bottom-3 left-3 flex transform gap-2 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <button
            onClick={() => {
              addToCart({
                productId: product._id,
                quantity: 1,
                size: Array.isArray(product?.sizes) ? product.sizes[0] : '',
                color: Array.isArray(product?.colors) ? product.colors[0] : '',
              });
            }}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
          <button
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
            className="cursor-pointer rounded-lg bg-white/90 p-2 text-gray-700 transition-colors hover:bg-white"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 line-clamp-2 text-base font-semibold text-nowrap text-gray-900 transition-colors group-hover:text-blue-600">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="mb-1 text-sm text-gray-500">{product.brand}</p>
              <div className="mb-1 flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product?.ratings)
                          ? 'fill-current text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {/* <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews[0]})
                </span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}

        {/* Price */}
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Colors */}
        {/* {product.colors && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Colors:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{
                    backgroundColor:
                      color.toLowerCase() === "white"
                        ? "#ffffff"
                        : color.toLowerCase() === "black"
                        ? "#000000"
                        : color.toLowerCase() === "blue"
                        ? "#3b82f6"
                        : color.toLowerCase() === "red"
                        ? "#ef4444"
                        : color.toLowerCase() === "gray"
                        ? "#6b7280"
                        : color.toLowerCase() === "brown"
                        ? "#92400e"
                        : color.toLowerCase() === "tan"
                        ? "#d2b48c"
                        : color.toLowerCase() === "silver"
                        ? "#c0c0c0"
                        : color.toLowerCase() === "gold"
                        ? "#ffd700"
                        : color.toLowerCase() === "rose gold"
                        ? "#e8b4b8"
                        : color.toLowerCase() === "tortoise"
                        ? "#8b4513"
                        : "#9ca3af",
                  }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        )} */}

        {/* <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p> */}
      </div>
    </div>
  );
};
