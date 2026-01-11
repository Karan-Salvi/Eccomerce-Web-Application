import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-amber-600 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Stay Updated with Our Latest Deals
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-amber-100">
          Subscribe to our newsletter and be the first to know about exclusive
          offers, new arrivals, and special promotions.
        </p>
        <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address..."
            className="flex-1 rounded-lg px-6 py-4 text-gray-900 ring-2 ring-gray-50 placeholder:font-semibold placeholder:text-gray-50 focus:ring-2 focus:ring-white focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-8 py-4 font-semibold whitespace-nowrap text-white transition-colors duration-200 hover:bg-slate-800"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
