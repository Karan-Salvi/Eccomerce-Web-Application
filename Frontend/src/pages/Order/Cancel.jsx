import React from 'react';
import Navbar from '../../components/Home/Navbar';

const Cancel = () => {
  return (
    <>
      <Navbar />

      <div class="container mx-auto px-2 py-2">
        <div class="overflow-hidden rounded-sm bg-white shadow-sm">
          {/* <!-- Header --> */}
          <div class="bg-gradient-to-r from-orange-500 to-amber-500 p-6 md:p-8">
            <div class="crossmark mb-6"></div>
            <h1 class="mb-2 text-center text-3xl font-bold text-white md:text-4xl">
              Payment Cancelled
            </h1>
            <p class="mx-auto max-w-md text-center text-white">
              You've cancelled your payment process. Your cart items have been
              saved.
            </p>
          </div>

          {/* <!-- Order Summary --> */}
          <div class="border-b border-gray-100 p-6 md:p-8">
            <h2 class="mb-6 text-xl font-semibold text-gray-800">
              Your Order Details
            </h2>

            <div class="mb-8 grid grid-cols-2 gap-6">
              <div>
                <p class="mb-1 text-sm text-gray-500">Order Number</p>
                <p class="font-medium text-gray-800">#CL-2023-45678</p>
              </div>
              <div>
                <p class="mb-1 text-sm text-gray-500">Date</p>
                <p class="font-medium text-gray-800">December 12, 2023</p>
              </div>
              <div>
                <p class="mb-1 text-sm text-gray-500">Payment Method</p>
                <p class="font-medium text-gray-800">Credit Card</p>
              </div>
              <div>
                <p class="mb-1 text-sm text-gray-500">Total Amount</p>
                <p class="font-medium text-gray-800">$147.00</p>
              </div>
            </div>

            <div class="rounded border-l-4 border-amber-500 bg-amber-50 p-4">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="font-medium text-amber-800">Your Items Are Saved</p>
                  <p class="mt-1 text-sm text-amber-700">
                    Your cart items will be available for 7 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Items Preview --> */}
          <div class="p-6 md:p-8">
            <h2 class="mb-6 text-xl font-semibold text-gray-800">
              Items Ordered
            </h2>

            <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div class="flex items-center rounded-md bg-gray-50 p-3 hover:bg-gray-100">
                <div class="h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                  <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/61e23be6-4cc6-44ee-940b-cc9ae0e30891.png"
                    alt="Modern ceramic dinner plate set with minimalist design in white and gold"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="ml-4">
                  <h3 class="font-medium text-gray-800">Dinner Plate Set</h3>
                  <p class="text-sm text-gray-500">Qty: 1</p>
                </div>
                <div class="ml-auto font-medium text-gray-800">$45.00</div>
              </div>

              <div class="flex items-center rounded-md bg-gray-50 p-3 hover:bg-gray-100">
                <div class="h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                  <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/20af3522-3d43-42b0-bceb-dc9d200b6c85.png"
                    alt="Stainless steel kitchen knife set with wooden block and sharp blades"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="ml-4">
                  <h3 class="font-medium text-gray-800">Knife Set</h3>
                  <p class="text-sm text-gray-500">Qty: 1</p>
                </div>
                <div class="ml-auto font-medium text-gray-800">$89.00</div>
              </div>

              <div class="flex items-center rounded-md bg-gray-50 p-3 hover:bg-gray-100">
                <div class="h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                  <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5d9ec53f-dbd0-45ff-9d9e-eecadf225d96.png"
                    alt="Organic bamboo fiber kitchen towels in earth tone colors"
                    class="h-full w-full object-cover"
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
            <div class="flex items-center justify-between gap-1.5">
              <button class="flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-2 font-medium text-white transition-colors hover:bg-orange-600">
                Return to Cart
              </button>

              <button class="w-full rounded-lg border border-orange-500 px-6 py-2 font-medium text-orange-500 transition-colors hover:bg-orange-50">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cancel;
