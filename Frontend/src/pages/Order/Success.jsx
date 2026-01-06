import React from "react";
import Navbar from "../../components/Home/Navbar";

const Success = () => {
  return (
    <>
      <Navbar />
      <div class="container mx-auto px-4 py-2">
        <div class="bg-white rounded-sm shadow-sm overflow-hidden">
          {/* <!-- Header --> */}
          <div class="bg-gradient-to-r from-orange-500 to-amber-500 p-6 md:p-8">
            <div class="checkmark mb-6"></div>
            <h1 class="text-3xl md:text-4xl font-bold text-white text-center mb-2">
              Order Confirmed!
            </h1>
            <p class="text-white text-center max-w-md mx-auto">
              Thank you for shopping with Cartloop. We've received your order
              and it's being processed.
            </p>
          </div>

          {/* <!-- Order Summary --> */}
          <div class="p-6 md:p-8 border-b border-gray-100">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">
              Your Order Details
            </h2>

            <div class="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p class="text-sm text-gray-500 mb-1">Order Number</p>
                <p class="font-medium text-gray-800">#CL-2023-45678</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Date</p>
                <p class="font-medium text-gray-800">December 12, 2023</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Payment Method</p>
                <p class="font-medium text-gray-800">Credit Card</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Total Amount</p>
                <p class="font-medium text-gray-800">$147.00</p>
              </div>
            </div>

            <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <div class="flex">
                <div class="shrink-0 text-amber-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="font-medium text-amber-800">Estimated Delivery</p>
                  <p class="mt-1 text-sm text-amber-700">
                    Your order should arrive by Friday, December 15
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Items Preview --> */}
          <div class="p-6 md:p-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">
              Items Ordered
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div class="flex items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-md">
                <div class="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                  <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/61e23be6-4cc6-44ee-940b-cc9ae0e30891.png"
                    alt="Modern ceramic dinner plate set with minimalist design in white and gold"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="ml-4">
                  <h3 class="font-medium text-gray-800">Dinner Plate Set</h3>
                  <p class="text-sm text-gray-500">Qty: 1</p>
                </div>
                <div class="ml-auto font-medium text-gray-800">$45.00</div>
              </div>

              <div class="flex items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-md">
                <div class="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                  <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/20af3522-3d43-42b0-bceb-dc9d200b6c85.png"
                    alt="Stainless steel kitchen knife set with wooden block and sharp blades"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="ml-4">
                  <h3 class="font-medium text-gray-800">Knife Set</h3>
                  <p class="text-sm text-gray-500">Qty: 1</p>
                </div>
                <div class="ml-auto font-medium text-gray-800">$89.00</div>
              </div>

              <div class="flex items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-md">
                <div class="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                  <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5d9ec53f-dbd0-45ff-9d9e-eecadf225d96.png"
                    alt="Organic bamboo fiber kitchen towels in earth tone colors"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="ml-4">
                  <h3 class="font-medium text-gray-800">Kitchen Towels</h3>
                  <p class="text-sm text-gray-500">Qty: 3</p>
                </div>
                <div class="ml-auto font-medium text-gray-800">$13.00</div>
              </div>
            </div>
          </div>

          {/* <!-- Footer CTA --> */}
          <div class="bg-gray-50 p-6 md:p-8">
            <div class="space-y-4">
              <button class="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors">
                Continue Shopping
              </button>

              <p class="text-center text-sm text-gray-500">
                Having issues with your order?{" "}
                <a
                  href="#"
                  class="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
