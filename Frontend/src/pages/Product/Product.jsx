import { AlertTriangle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import Navbar from '../../components/Home/Navbar';
import ProductDetail from '../../components/Product/ProductDetail';
import ProductDetailSkeleton from '../../components/Product/ProductDetailSkeleton';
import { useGetProductDetailsQuery } from '../../store/api/productApi';

const Product = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(id);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      {isLoading && <ProductDetailSkeleton />}

      {isError && (
        <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-xl font-bold text-zinc-900">
            Couldn&apos;t load this product
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            {error?.data?.message || "It may have been removed, or there's a connection issue."}
          </p>
          <Link
            to="/products"
            className="mt-6 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Back to Products
          </Link>
        </div>
      )}

      {!isLoading && !isError && <ProductDetail product={product?.data} />}
    </div>
  );
};

export default Product;
