import React from 'react';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import './Notfound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main class="flex flex-grow items-center">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-24 lg:px-8">
          <div class="flex flex-col items-center md:flex-row">
            <div class="mb-10 md:mb-0 md:w-1/2 md:pr-10">
              <h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
                <span class="gradient-text">404</span> Error
              </h1>
              <h2 class="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl">
                Oops! Page Not Found
              </h2>
              <p class="mb-8 text-gray-600">
                The page you're looking for doesn't exist or has been moved. Try
                searching for what you need, or return to our homepage.
              </p>

              {/* <!-- Action Buttons --> */}
              <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link
                  to={'/'}
                  class="hover:bg-orange-dark rounded-lg bg-orange-500 px-6 py-3 text-center font-medium text-white transition duration-300"
                >
                  Go to Homepage
                </Link>
                <Link
                  to={'/products'}
                  class="border-orange-DEFAULT text-orange-DEFAULT rounded-lg border px-6 py-3 text-center font-medium transition duration-300 hover:bg-orange-50"
                >
                  Browse Products
                </Link>
              </div>
            </div>

            <div class="flex justify-center md:w-1/2">
              <div class="relative w-full max-w-md">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f8e55106-57eb-49f8-aff8-ebe68c527914.png"
                  alt="Modern illustration of a confused person looking at a map on a smartphone with a magnifying glass and orange-themed shopping elements around"
                  class="floating h-auto w-full"
                />
                <div class="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-yellow-100 opacity-30"></div>
                <div class="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-orange-100 opacity-30"></div>
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
