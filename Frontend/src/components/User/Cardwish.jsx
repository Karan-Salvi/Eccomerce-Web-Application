import React from "react";

const Cardwish = ({ product, index }) => {
  return (
    <div
      key={index}
      className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition duration-100"
    >
      <div className="h-40 mb-3 rounded-lg overflow-hidden">
        <img
          src={product?.images[0]?.url || `https://placehold.co/400`}
          alt="Apple iPad Pro 12.9-inch with Magic Keyboard on a desk with coffee cup"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-gray-800 font-medium text-sm mb-1">{product?.name}</p>
      <p className="text-gray-600 text-sm mb-2">₹{product?.price}</p>
      <div className="flex justify-between items-center">
        <button className="text-red-500 hover:text-red-700 text-xs">
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
        <button className="bg-orange-600 text-white text-xs px-2 py-1 rounded hover:bg-orange-700 transition duration-100">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Cardwish;
