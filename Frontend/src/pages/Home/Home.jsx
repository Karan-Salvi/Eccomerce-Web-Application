import React, { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  ArrowRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  TrendingUp,
  Award,
} from "lucide-react";
import Footer from "../../components/Home/Footer";
import Newsletter from "../../components/Home/Newsletter";
import Testimonial from "../../components/Home/Testimonial";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "2,500+ items",
    },
    {
      name: "Fashion",
      image:
        "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "3,200+ items",
    },
    {
      name: "Home & Garden",
      image:
        "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "1,800+ items",
    },
    {
      name: "Sports",
      image:
        "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "950+ items",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 159.99,
      originalPrice: 199.99,
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      reviews: 324,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249.99,
      originalPrice: 299.99,
      image:
        "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      reviews: 567,
    },
    {
      id: 3,
      name: "Premium Backpack",
      price: 89.99,
      originalPrice: 119.99,
      image:
        "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: 39.99,
      originalPrice: 59.99,
      image:
        "https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.6,
      reviews: 445,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content:
        "Amazing shopping experience! Fast delivery and excellent customer service. I've been shopping here for over 2 years.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      content:
        "Best prices on electronics I've found anywhere. The product quality is outstanding and shipping is incredibly fast.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Emily Rodriguez",
      role: "Fashion Blogger",
      content:
        "Love the variety and style! The return policy is fantastic and customer support is always helpful and friendly.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  TrendyCart
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Home
              </a>
              <a
                href="/products"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Deals
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-amber-600 transition-colors duration-200 cursor-pointer">
                <Search className="h-5 w-5" />
              </button>
              <a
                href="/vendor"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200"
              >
                <User className="h-5 w-5" />
              </a>
              <button className="relative text-gray-700 hover:text-amber-600 transition-colors duration-200 cursor-pointer">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-700 hover:text-amber-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
                >
                  Categories
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
                >
                  Deals
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modern Hero Section */}
      <section className="relative min-h-screen lg:max-h-screen lg:flex lg:items-center h-auto bg-gradient-to-br from-slate-50 via-white to-amber-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-100/20 to-slate-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-2" />
                #1 Trusted E-commerce Platform
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                    Shop Smart,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                    Live Better
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  Discover millions of products at unbeatable prices with
                  lightning-fast delivery and world-class customer service.
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">10M+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">50M+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">99.9%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="group bg-white hover:bg-gray-50 text-slate-900 font-semibold py-4 px-8 rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-600" />
                  <span className="text-sm text-gray-600">Award Winning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Secure Shopping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Main Product Showcase */}
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-6 ">
                  {/* Large Featured Product */}
                  <div className="col-span-2 bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 ">
                    <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-6 overflow-hidden">
                      <img
                        src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Featured Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        Wireless Earbuds Pro
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">(4.8)</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl font-bold text-slate-900">
                          $159.99
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          $199.99
                        </span>
                        <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                          20% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Smaller Product Cards */}
                  <div className="bg-white rounded-2xl shadow-lg p-4 transform hover:scale-105 transition-all duration-300">
                    <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl mb-3 overflow-hidden">
                      <img
                        src="https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Smart Watch"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">
                      Smart Watch
                    </h4>
                    <p className="text-amber-600 font-bold">$249.99</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-4 transform hover:scale-105 transition-all duration-300">
                    <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mb-3 overflow-hidden">
                      <img
                        src="https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Premium Backpack"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">
                      Premium Backpack
                    </h4>
                    <p className="text-amber-600 font-bold">$89.99</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <Shield className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Truck className="h-6 w-6" />
              </div>
              <div className="absolute top-1/2 -left-8 bg-amber-500 text-white p-2 rounded-full shadow-lg">
                <Star className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of products across multiple categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hand-picked products with amazing deals just for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors duration-200">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    SALE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg transition-colors duration-200">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Free Fast Delivery</h3>
              <p className="text-gray-300 leading-relaxed">
                Free shipping on orders over $50. Express delivery available
                with tracking.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Secure Shopping</h3>
              <p className="text-gray-300 leading-relaxed">
                Your data is protected with bank-level encryption and secure
                payment processing.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Easy Returns</h3>
              <p className="text-gray-300 leading-relaxed">
                30-day hassle-free returns with free return shipping on all
                orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonial />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
