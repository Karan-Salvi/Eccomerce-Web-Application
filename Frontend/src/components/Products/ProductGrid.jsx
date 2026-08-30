import React, { useState } from 'react';
import { PackageSearch } from 'lucide-react';
import { ProductCard } from './ProductCard';
import ProductDetail from '../../components/Product/ProductDetail';

export const ProductGrid = ({ products, loading }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-[20px] bg-white ring-1 ring-zinc-200"
          >
            <div className="aspect-square bg-zinc-200" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 rounded bg-zinc-200" />
              <div className="h-3 w-1/2 rounded bg-zinc-200" />
              <div className="h-4 w-1/4 rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="py-20 text-center">
        <PackageSearch className="mx-auto h-10 w-10 text-zinc-300" />
        <h3 className="mt-4 text-lg font-semibold text-zinc-900">
          No products found
        </h3>
        <p className="mt-1 text-zinc-500">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          setSelectedProduct={setSelectedProduct}
        />
      ))}
    </div>
  );
};
