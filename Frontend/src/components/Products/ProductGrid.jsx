import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import ProductDetail from '../../components/Product/ProductDetail';
import { Pagination } from './Pagination';

export const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm"
          >
            <div className="aspect-square bg-gray-200" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-1/4 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-gray-400">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0H4m16 0l-2-2m-2 0l-2-2m2 2l2 2M4 13l2-2m-2 0l2-2m2 2l2 2"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          No products found
        </h3>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  const [selectedProduct, setSelectedProduct] = useState(null);

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            setSelectedProduct={setSelectedProduct}
          />
        ))}
      </div>
    </>
  );
};
