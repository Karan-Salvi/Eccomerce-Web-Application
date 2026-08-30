import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProductCard } from '../Products/ProductCard';

const WishlistCard = ({ wishlist }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200">
      <div className="flex items-center justify-between border-b border-zinc-200 p-6">
        <h3 className="text-base font-semibold text-zinc-900">Wishlist</h3>
        {wishlist?.length > 0 && (
          <Link to="/wishlist" className="text-sm font-semibold text-amber-600 hover:text-amber-700">
            View all
          </Link>
        )}
      </div>

      {!wishlist || wishlist.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <Heart className="h-8 w-8 text-zinc-300" />
          <p className="text-sm text-zinc-500">Nothing saved yet.</p>
          <Link to="/products" className="text-sm font-semibold text-amber-600 hover:text-amber-700">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.slice(0, 6).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistCard;
