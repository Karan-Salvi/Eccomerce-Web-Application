import React, { useEffect, useState } from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from '../../store/api/authApi';
import { useSelector } from 'react-redux';

export const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
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

  const hasDiscount = product.originalPrice > product.price;
  const discount = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const handleToggleWishlist = () => {
    const nextWishlisted = !isWishlisted;
    setIsWishlisted(nextWishlisted);
    if (nextWishlisted) {
      addToWishlist({ productId: product._id });
    } else {
      removeFromWishlist(product._id);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-zinc-200 transition-shadow duration-300 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <img
          src={product?.images[0]?.url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-full bg-zinc-500 px-2.5 py-1 text-xs font-semibold text-white">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 cursor-pointer rounded-full p-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:outline-none ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-zinc-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Legibility scrim under the floating controls */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-300 sm:group-hover:opacity-100" />

        {/* Quick Actions: always visible on touch devices, hover-reveal on pointer devices */}
        <div className="absolute right-3 bottom-3 left-3 flex gap-2 transition-all duration-300 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            onClick={() => {
              addToCart({
                productId: product._id,
                quantity: 1,
                size: Array.isArray(product?.sizes) ? product.sizes[0] : '',
                color: Array.isArray(product?.colors) ? product.colors[0] : '',
              });
            }}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
          <button
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
            aria-label="View product details"
            className="cursor-pointer rounded-full bg-white/90 p-2 text-zinc-700 transition-colors hover:bg-white"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 transition-colors group-hover:text-amber-600">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-zinc-500">{product.brand}</p>
          <div className="flex flex-shrink-0 items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product?.ratings)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-zinc-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-zinc-900">
            ₹{product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-zinc-400 line-through">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
