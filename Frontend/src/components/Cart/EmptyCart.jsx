import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProductCard } from '../Products/ProductCard';
import { Reveal } from '../Home/Reveal';
import { useGetAllProductsByPageQuery } from '../../store/api/productApi';

const QUICK_CATEGORIES = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports & Fitness'];

const EmptyCart = () => {
  const { data, isLoading } = useGetAllProductsByPageQuery({ page: 1, limit: 4, sort: 'rating' });
  const popularProducts = data?.products ?? [];

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <ShoppingBag className="h-7 w-7" strokeWidth={2} />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-zinc-600">
            Nothing here yet. Start with a category below, or see what's popular right now.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Start shopping
            </Link>
            {QUICK_CATEGORIES.map((category) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-amber-600 hover:text-amber-600"
              >
                {category}
              </Link>
            ))}
          </div>
        </Reveal>

        {(isLoading || popularProducts.length > 0) && (
          <Reveal delay={0.1} className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-bold text-zinc-900">Popular right now</h2>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-amber-600"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {isLoading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-[3/4] animate-pulse rounded-[20px] bg-zinc-200" />
                  ))
                : popularProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default EmptyCart;
