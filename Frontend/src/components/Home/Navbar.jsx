import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import { RiAdminLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="brand_name bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-2xl font-bold text-transparent">
                CartLoop
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
            <Link
              to={'/'}
              className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
            >
              Home
            </Link>
            <Link
              to={'/products'}
              className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
            >
              Categories
            </Link>
            {/* <Link
              to={"/products"}
              className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              Deals
            </Link> */}
            <Link
              to={'/about'}
              className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
            >
              About
            </Link>
            <Link
              to={'/contact'}
              className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
            >
              Contact
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* <button className="text-gray-700 hover:text-amber-600 transition-colors duration-200 cursor-pointer">
              <Search className="h-5 w-5" />
            </button> */}
            <Link
              to={isAuthenticated ? '/profile' : '/login'}
              className="text-gray-700 transition-colors duration-200 hover:text-amber-600"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              to={'/wishlist'}
              className="text-gray-700 transition-colors duration-200 hover:text-amber-600"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              to={'/cart'}
              className="relative cursor-pointer text-gray-700 transition-colors duration-200 hover:text-amber-600"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
                {user?.data?.cart?.length ??
                  JSON.parse(localStorage.getItem('cart') || '[]').length}
              </span>
            </Link>
            {user && isAuthenticated && user?.data?.role == 'vendor' && (
              <Link
                to={'/vendor'}
                className="relative cursor-pointer text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                <RiAdminLine className="h-5.25 w-5.25" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="text-gray-700 transition-colors duration-200 hover:text-amber-600 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link
                to={'/'}
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                Home
              </Link>
              <Link
                to={'/products'}
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                Categories
              </Link>
              {/* <Link
                to={"/products"}
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Deals
              </Link> */}
              <Link
                to={'/about'}
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                About
              </Link>
              <Link
                to={'/contact'}
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
