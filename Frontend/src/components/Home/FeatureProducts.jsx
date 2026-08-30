import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../Products/ProductCard';
import { useGetAllProductsByPageQuery } from '../../store/api/productApi';
import { Reveal } from './Reveal';

const FeatureProducts = () => {
  const { data, isLoading } = useGetAllProductsByPageQuery({
    page: 1,
    limit: 4,
    sort: 'rating',
  });

  const products = data?.products || [];

  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Highest rated
          </h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-amber-600"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {isLoading && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-[20px] bg-zinc-200"
              />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <p className="mt-10 text-zinc-600">No products to show yet.</p>
        )}

        {!isLoading && products.length > 0 && (
          <Reveal delay={0.1} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default FeatureProducts;
