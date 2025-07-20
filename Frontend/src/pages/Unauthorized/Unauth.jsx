import React from "react";
import { IoWarningOutline } from "react-icons/io5";

const Unauth = () => {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* <!-- Header with orange accent --> */}
        <div class="bg-orange-500 py-4 px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i class="fas fa-store text-white text-2xl"></i>
              <span class="text-white font-bold text-xl brand_name">CartLoop</span>
            </div>
            <div class="text-white text-sm font-medium">Error 403</div>
          </div>
        </div>

        {/* <!-- Main content --> */}
        <div class="p-6">
          <div class="flex flex-col items-center text-center mb-6">
            <div class="bg-orange-100 p-4 rounded-full mb-4 flex items-center justify-center">
              <IoWarningOutline class=" text-orange-500 text-5xl"></IoWarningOutline>
            </div>
            <h1 class="text-2xl font-bold text-gray-800 mb-2">
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
              class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-center"
            >
              Sign In to Your Account
            </a>

            <a
              href="/"
              class="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200 text-center"
            >
              Return to Homepage
            </a>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div class="bg-gray-50 py-4 px-6 border-t border-gray-200">
          <p class="text-center text-gray-500 text-sm">
            Need help?{" "}
            <a
              href="/contact"
              class="text-orange-500 hover:text-orange-600 font-medium"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>

      <div class="mt-6 text-center text-gray-500 text-sm">
        <p>© 2023 ShopSphere. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Unauth;
