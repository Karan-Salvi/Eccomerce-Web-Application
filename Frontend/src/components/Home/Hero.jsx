import {
  ArrowRight,
  Award,
  Play,
  Shield,
  Star,
  TrendingUp,
  Truck,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-auto min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50 lg:flex lg:max-h-screen lg:items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-amber-100/20 to-slate-100/20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="grid min-h-[80vh] grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
              <TrendingUp className="mr-2 h-4 w-4" />
              #1 Trusted E-commerce Platform
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl leading-tight font-bold sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                  Shop Smart,
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                  Live Better
                </span>
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-gray-600 sm:text-2xl">
                Discover millions of products at unbeatable prices with
                lightning-fast delivery and world-class customer service.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
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
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to="/products"
                className="group flex transform items-center justify-center rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-amber-700 hover:to-amber-600 hover:shadow-xl"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <button className="group flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 font-semibold text-slate-900 transition-all duration-300 hover:border-slate-300 hover:bg-gray-50">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 pt-4 lg:justify-start">
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
              <div className="grid grid-cols-2 gap-6">
                {/* Large Featured Product */}
                <div className="col-span-2 transform rounded-3xl bg-white p-8 shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="mb-6 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                      src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Featured Product"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      Wireless Earbuds Pro
                    </h3>
                    <div className="mb-3 flex items-center justify-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-current text-yellow-400"
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
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-800">
                        20% OFF
                      </span>
                    </div>
                  </div>
                </div>

                {/* Smaller Product Cards */}
                <div className="transform rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="mb-3 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-amber-200">
                    <img
                      src="https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Smart Watch"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-slate-900">
                    Smart Watch
                  </h4>
                  <p className="font-bold text-amber-600">₹249.99</p>
                </div>

                <div className="transform rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="mb-3 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                      src="https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Premium Backpack"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-slate-900">
                    Premium Backpack
                  </h4>
                  <p className="font-bold text-amber-600">89.99</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 animate-bounce rounded-full bg-green-500 p-3 text-white shadow-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-pulse rounded-full bg-blue-500 p-3 text-white shadow-lg">
              <Truck className="h-6 w-6" />
            </div>
            <div className="absolute top-1/2 -left-8 rounded-full bg-amber-500 p-2 text-white shadow-lg">
              <Star className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-slate-400">
          <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-slate-400"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
