import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import { SearchX } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-grow items-center justify-center px-4 py-24">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <SearchX className="h-8 w-8" strokeWidth={2} />
          </div>
          <h1 className="mt-6 text-5xl font-bold text-zinc-900">404</h1>
          <h2 className="mt-2 text-xl font-semibold text-zinc-900">Page not found</h2>
          <p className="mt-2 max-w-sm text-zinc-600">
            The page you're looking for doesn't exist or has been moved. Try browsing our
            products instead.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="rounded-full bg-amber-600 px-6 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-amber-700"
            >
              Go to homepage
            </Link>
            <Link
              to="/products"
              className="rounded-full border border-zinc-300 px-6 py-2.5 text-center text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Browse products
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
