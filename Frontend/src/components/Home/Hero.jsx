import {
  ArrowRight,
  Award,
  Play,
  Shield,
  Star,
  TrendingUp,
  Truck,
} from "lucide-react";
import React from "react";

const Hero = () => {
  return (
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
                        ₹159.99
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹199.99
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
                  <p className="text-amber-600 font-bold">₹249.99</p>
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
                  <p className="text-amber-600 font-bold">89.99</p>
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
  );
};

export default Hero;
