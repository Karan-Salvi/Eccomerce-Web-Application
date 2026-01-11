import { Heart, ShoppingCart, Star } from 'lucide-react';
import React from 'react';

const FeatureProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Wireless Earbuds Pro',
      price: 159.99,
      originalPrice: 199.99,
      image:
        'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      reviews: 324,
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 249.99,
      originalPrice: 299.99,
      image:
        'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      reviews: 567,
    },
    {
      id: 3,
      name: 'Premium Backpack',
      price: 89.99,
      originalPrice: 119.99,
      image:
        'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 4,
      name: 'Wireless Charging Pad',
      price: 39.99,
      originalPrice: 59.99,
      image:
        'https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      reviews: 445,
    },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Hand-picked products with amazing deals just for you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group transform overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 rounded-full bg-white/80 p-2 transition-colors duration-200 hover:bg-white">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
                <div className="absolute top-4 left-4 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  SALE
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-semibold text-gray-900 transition-colors duration-200 group-hover:text-amber-600">
                  {product.name}
                </h3>
                <div className="mb-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-current text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                  <button className="rounded-lg bg-amber-600 p-2 text-white transition-colors duration-200 hover:bg-amber-700">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
