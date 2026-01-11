import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';

const Unauth = () => {
  return (
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div class="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
        {/* <!-- Header with orange accent --> */}
        <div class="bg-orange-500 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i class="fas fa-store text-2xl text-white"></i>
              <span class="brand_name text-xl font-bold text-white">
                CartLoop
              </span>
            </div>
            <div class="text-sm font-medium text-white">Error 403</div>
          </div>
        </div>

        {/* <!-- Main content --> */}
        <div class="p-6">
          <div class="mb-6 flex flex-col items-center text-center">
            <div class="mb-4 flex items-center justify-center rounded-full bg-orange-100 p-4">
              <IoWarningOutline class="text-5xl text-orange-500"></IoWarningOutline>
            </div>
            <h1 class="mb-2 text-2xl font-bold text-gray-800">
              Unauthorized Access
            </h1>
            <p class="text-gray-600">
              You don't have permission to access this page. Please sign in with
              the correct account.
            </p>
          </div>

          <div class="space-y-4">
            <a
              href="/login"
              class="block w-full rounded-lg bg-orange-500 px-4 py-2 text-center font-medium text-white transition duration-200 hover:bg-orange-600"
            >
              Sign In to Your Account
            </a>

            <a
              href="/"
              class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-center font-medium text-gray-700 transition duration-200 hover:bg-gray-50"
            >
              Return to Homepage
            </a>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p class="text-center text-sm text-gray-500">
            Need help?{' '}
            <a
              href="/contact"
              class="font-medium text-orange-500 hover:text-orange-600"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>

      <div class="mt-6 text-center text-sm text-gray-500">
        <p>© 2023 ShopSphere. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Unauth;
