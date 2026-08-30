import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Home/Navbar';
import { Reveal } from '../../components/Home/Reveal';
import { ProductCard } from '../../components/Products/ProductCard';

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
          <div className="mt-10 flex flex-col items-center rounded-2xl bg-white py-20 text-center ring-1 ring-zinc-200">
            <Heart className="h-12 w-12 text-zinc-300" />
            <h2 className="mt-6 text-xl font-bold text-zinc-900">Nothing saved yet</h2>
            <p className="mt-2 text-zinc-600">Tap the heart on any product to save it here.</p>
            <Link
              to="/products"
              className="mt-6 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Browse products
            </Link>
          </div>
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
