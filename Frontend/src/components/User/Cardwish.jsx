import React from 'react';

const Cardwish = ({ product, index }) => {
  return (
    <div
      key={index}
      className="rounded-lg border border-gray-200 p-3 transition duration-100 hover:shadow-md"
    >
      <div className="mb-3 h-40 overflow-hidden rounded-lg">
        <img
          src={product?.images[0]?.url || `https://placehold.co/400`}
          alt="Apple iPad Pro 12.9-inch with Magic Keyboard on a desk with coffee cup"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mb-1 text-sm font-medium text-gray-800">{product?.name}</p>
      <p className="mb-2 text-sm text-gray-600">₹{product?.price}</p>
      <div className="flex items-center justify-between">
        <button className="text-xs text-red-500 hover:text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button className="rounded bg-orange-600 px-2 py-1 text-xs text-white transition duration-100 hover:bg-orange-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Cardwish;
