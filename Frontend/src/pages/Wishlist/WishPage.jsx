import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Home/Navbar';
import { Reveal } from '../../components/Home/Reveal';
import { ProductCard } from '../../components/Products/ProductCard';
import EmptyWishlist from '../../components/Wishlist/EmptyWishlist';

const WishPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const wishlist = user?.data?.wishlist ?? [];

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Wishlist</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
        </p>

        {wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <Reveal className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default WishPage;
