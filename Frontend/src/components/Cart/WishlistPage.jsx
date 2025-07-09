import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useEcommerce } from "../../contexts/EcommerceContext";
import { mockProducts } from "../../data/mockData1";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, addToCart, addToWishlist } =
    useEcommerce();

  // Add some sample products to wishlist for demo
  React.useEffect(() => {
    if (wishlistItems.length === 0) {
      addToWishlist(mockProducts[0]);
      addToWishlist(mockProducts[2]);
    }
  }, [wishlistItems.length, addToWishlist]);

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-8">Save items you love for later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {item.rating} ({item.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  {item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
