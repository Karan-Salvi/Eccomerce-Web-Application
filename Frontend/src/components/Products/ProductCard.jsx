import React, { useState } from "react";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import ProductDetail from "../../components/Product";

export const ProductCard = ({ product, setSelectedProduct }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // const [selectedProduct, setSelectedProduct] = useState(null);

  // if (selectedProduct) {
  //   console.log("Selected Product:", selectedProduct);
  //   return (
  //     <ProductDetail
  //       product={selectedProduct}
  //       onBack={() => setSelectedProduct(null)}
  //     />
  //   );
  // }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // console.log("Product individual", product);

  return (
    <div
      className="group relative bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product?.images[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.featured && (
            <span className="px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded-md">
              Featured
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-md">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded-md">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick Actions */}
        <div
          className={`absolute bottom-3 left-3 right-3 flex gap-2 transform transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
          <button
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
            className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg transition-colors cursor-pointer"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-base text-nowrap font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <div className="flex items-center gap-1 mb-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product?.ratings)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
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
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
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
