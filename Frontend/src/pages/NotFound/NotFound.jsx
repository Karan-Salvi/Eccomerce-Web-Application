import React from "react";
import Navbar from "../../components/Home/Navbar";
import Footer from "../../components/Home/Footer";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main class="flex-grow flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                <span class="gradient-text">404</span> Error
              </h1>
              <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Oops! Page Not Found
              </h2>
              <p class="text-gray-600 mb-8">
                The page you're looking for doesn't exist or has been moved. Try
                searching for what you need, or return to our homepage.
              </p>

              {/* <!-- Action Buttons --> */}
              <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to={"/"}
                  class="bg-orange-500 hover:bg-orange-dark text-white px-6 py-3 rounded-lg text-center font-medium transition duration-300"
                >
                  Go to Homepage
                </Link>
                <Link
                  to={"/products"}
                  class="border border-orange-DEFAULT text-orange-DEFAULT hover:bg-orange-50 px-6 py-3 rounded-lg text-center font-medium transition duration-300"
                >
                  Browse Products
                </Link>
              </div>
            </div>

            <div class="md:w-1/2 flex justify-center">
              <div class="relative w-full max-w-md">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f8e55106-57eb-49f8-aff8-ebe68c527914.png"
                  alt="Modern illustration of a confused person looking at a map on a smartphone with a magnifying glass and orange-themed shopping elements around"
                  class="floating w-full h-auto"
                />
                <div class="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-100 rounded-full opacity-30"></div>
                <div class="absolute -top-6 -right-6 w-16 h-16 bg-orange-100 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
