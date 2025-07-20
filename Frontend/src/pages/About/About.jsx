import React from "react";
import Navbar from "../../components/Home/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <section class="gradient-bg py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="md:grid md:grid-cols-2 md:gap-8 items-center">
            <div class="mb-10 md:mb-0">
              <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Our Story
              </h1>
              <p class="mt-4 text-lg text-gray-600">
                From a modest start in a small workspace to becoming the most
                trusted name in e-commerce, our journey has been fueled by
                passion, persistence, and people. We started with a single goal
                — to simplify shopping and connect sellers to customers across
                every corner of the country. What began as a small initiative
                quickly turned into a platform that serves millions.
                <br />
                With cutting-edge technology, a customer-first mindset, and a
                strong network of partners, we've revolutionized how people shop
                online. We believe in innovation, transparency, and trust. Every
                feature we build, every product we deliver, and every story we
                tell reflects our commitment to making online shopping seamless,
                reliable, and enjoyable.
              </p>
              <div class="mt-8 flex space-x-4">
                <button class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium">
                  Start Shopping
                </button>
                <button class="border border-primary-500 text-primary-500 hover:bg-primary-50 px-6 py-3 rounded-md font-medium">
                  Watch Demo
                </button>
              </div>
            </div>
            <div>
              <img
                src="/images/about.jpg"
                alt="CartLoop team celebrating in a modern office space with orange accents"
                class="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-3 gap-8 text-center">
            <div class="bg-gray-50 p-8 rounded-xl">
              <h3 class="text-5xl font-bold text-primary-500">10M+</h3>
              <p class="mt-2 text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div class="bg-gray-50 p-8 rounded-xl">
              <h3 class="text-5xl font-bold text-primary-500">50M+</h3>
              <p class="mt-2 text-gray-600 font-medium">Products</p>
            </div>
            <div class="bg-gray-50 p-8 rounded-xl">
              <h3 class="text-5xl font-bold text-primary-500">99.9%</h3>
              <p class="mt-2 text-gray-600 font-medium">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              To make quality products accessible to everyone with an enjoyable,
              convenient, and secure shopping experience.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-xl shadow-sm">
              <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Free Fast Delivery
              </h3>
              <p class="text-gray-600">
                Free shipping on orders over 50 with express delivery available
                and real-time tracking.
              </p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-sm">
              <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m-7 2a9 9 0 110-18 9 9 0 010 18z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Secure Shopping
              </h3>
              <p class="text-gray-600">
                Your data is protected with bank-level encryption and secure
                payment processing.
              </p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-sm">
              <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Easy Returns
              </h3>
              <p class="text-gray-600">
                30-day hassle-free returns with free return shipping on all
                orders.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind{" "}
              <span className="brand_name">CartLoop</span>'s success
            </p>
          </div>

          <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <img
                src="/images/people1.jpg"
                alt="Smiling female CEO wearing business casual attire in an orange-themed office"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 class="text-lg font-semibold text-gray-900">Karan Salvi</h3>
              <p class="text-primary-600">CEO & Founder</p>
            </div>

            <div class="text-center">
              <img
                src="/images/people4.jpg"
                alt="Female marketing director holding tablet with CartLoop app open"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 class="text-lg font-semibold text-gray-900">
                Vedant Jamodakar
              </h3>
              <p class="text-primary-600">Co-Founder</p>
            </div>

            <div class="text-center">
              <img
                src="/images/people2.jpg"
                alt="Male tech executive wearing glasses standing against a orange accent wall"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 class="text-lg font-semibold text-gray-900">Vishwas Gore</h3>
              <p class="text-primary-600">CTO</p>
            </div>

            <div class="text-center">
              <img
                src="/images/people3.jpg"
                alt="Customer service manager smiling with headset on in modern office setting"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 class="text-lg font-semibold text-gray-900">
                Kshitij Kadlag
              </h3>
              <p class="text-primary-600">CFO</p>
            </div>
          </div>
        </div>
      </section>
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-xl shadow-sm">
              <div class="flex items-center mb-4">
                <div class="flex-shrink-0 mr-4">
                  <img
                    src="/images/review1.jpg"
                    alt="Happy female customer smiling in home environment with CartLoop package"
                    class="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900">
                    Jennifer K.
                  </h4>
                  <p class="text-primary-600 text-sm">Regular Customer</p>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "I've been shopping with{" "}
                <span className="brand_name">CartLoop</span> for over two years
                now and have never been disappointed. The prices are unbeatable
                and their customer service is truly exceptional. My orders
                always arrive sooner than expected!"
              </p>
              <div class="mt-4 flex">
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-sm">
              <div class="flex items-center mb-4">
                <div class="flex-shrink-0 mr-4">
                  <img
                    src="/images/review2.jpg"
                    alt="Young male customer holding CartLoop product box with enthusiastic expression"
                    class="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900">Robert T.</h4>
                  <p class="text-primary-600 text-sm">First-time Customer</p>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "I was hesitant to order online at first, but{" "}
                <span class="brand_name">CartLoop</span> made the process so
                simple and secure. When I had a question about my order, their
                support team responded within minutes. Will definitely be
                shopping here again!"
              </p>
              <div class="mt-4 flex">
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay Updated with Our Latest Deals
          </h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive
            offers, new arrivals, and special promotions.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white ring-2 ring-gray-50 placeholder:text-gray-50 placeholder:font-semibold"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 brand_name">CartLoop</h3>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Your trusted online destination for quality products at
                unbeatable prices. Shop with confidence and enjoy exceptional
                customer service.
              </p>
              <div className="flex space-x-4">
                <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors duration-200">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors duration-200">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors duration-200">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.219.085.339-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Categories</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Electronics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Fashion
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Home & Garden
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Sports
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Books
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 <span>CartLoop</span>. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default About;
