import React from "react";

const Newsletter = () => {
  return (
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
  );
};

export default Newsletter;
