import { RefreshCw, Shield, Truck } from 'lucide-react';
import React from 'react';

const FeatureSection = () => {
  return (
    <section className="bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Why Choose Us</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            We're committed to providing the best shopping experience possible
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-800 p-8 text-center transition-colors duration-300 hover:bg-slate-700">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-600">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold">Free Fast Delivery</h3>
            <p className="leading-relaxed text-gray-300">
              Free shipping on orders over ₹50. Express delivery available with
              tracking.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-8 text-center transition-colors duration-300 hover:bg-slate-700">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-600">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold">Secure Shopping</h3>
            <p className="leading-relaxed text-gray-300">
              Your data is protected with bank-level encryption and secure
              payment processing.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-8 text-center transition-colors duration-300 hover:bg-slate-700">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-600">
              <RefreshCw className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold">Easy Returns</h3>
            <p className="leading-relaxed text-gray-300">
              30-day hassle-free returns with free return shipping on all
              orders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
