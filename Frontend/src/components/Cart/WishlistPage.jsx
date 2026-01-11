import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useEcommerce } from '../../contexts/EcommerceContext';
import { mockProducts } from '../../data/mockData1';

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
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center">
          <Heart className="mx-auto mb-6 h-24 w-24 text-gray-300" />
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Your wishlist is empty
          </h2>
          <p className="mb-8 text-gray-600">Save items you love for later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Wishlist</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 cursor-pointer rounded-full bg-white p-2 shadow-md transition-colors hover:bg-red-50"
              >
                <Heart className="h-5 w-5 fill-current text-red-500" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="mb-2 font-semibold text-gray-800">{item.name}</h3>
              <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                {item.description}
              </p>

              <div className="mb-3 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(item.rating)
                          ? 'fill-current text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {item.rating} ({item.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  {item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="flex cursor-pointer items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
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
