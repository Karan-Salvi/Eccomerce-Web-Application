import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Reveal } from '../Home/Reveal';
import PopularProductsGrid from '../Products/PopularProductsGrid';

const QUICK_CATEGORIES = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports & Fitness'];

const EmptyWishlist = () => {
  return (
    <div className="mt-10">
      <Reveal className="max-w-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <Heart className="h-7 w-7" strokeWidth={2} />
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900">Nothing saved yet</h2>
        <p className="mt-2 text-zinc-600">
          Tap the heart on any product to save it here for later. Start with a category below,
          or see what other shoppers are loving right now.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/products"
            className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Browse products
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

      <PopularProductsGrid delay={0.1} title="Trending picks" />
    </div>
  );
};

export default EmptyWishlist;
