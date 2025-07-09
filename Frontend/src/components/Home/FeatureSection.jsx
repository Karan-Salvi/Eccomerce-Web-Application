import { RefreshCw, Shield, Truck } from "lucide-react";
import React from "react";

const FeatureSection = () => {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We're committed to providing the best shopping experience possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors duration-300">
            <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Free Fast Delivery</h3>
            <p className="text-gray-300 leading-relaxed">
              Free shipping on orders over ₹50. Express delivery available with
              tracking.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors duration-300">
            <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Secure Shopping</h3>
            <p className="text-gray-300 leading-relaxed">
              Your data is protected with bank-level encryption and secure
              payment processing.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors duration-300">
            <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Easy Returns</h3>
            <p className="text-gray-300 leading-relaxed">
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
