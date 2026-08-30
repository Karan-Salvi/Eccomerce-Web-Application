import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProductCard } from './ProductCard';
import { Reveal } from '../Home/Reveal';
import { useGetAllProductsByPageQuery } from '../../store/api/productApi';

const PopularProductsGrid = ({ delay = 0, title = 'Popular right now' }) => {
  const { data, isLoading } = useGetAllProductsByPageQuery({ page: 1, limit: 4, sort: 'rating' });
  const products = data?.products ?? [];

  if (!isLoading && products.length === 0) return null;

  return (
    <Reveal delay={delay} className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
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
          : products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </Reveal>
  );
};

export default PopularProductsGrid;
