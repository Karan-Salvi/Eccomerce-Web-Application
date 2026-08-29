import { Heart, Menu, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import { RiAdminLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="group relative py-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-900"
  >
    {children}
    <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-amber-600 transition-all duration-300 group-hover:w-full" />
  </Link>
);

const IconLink = ({ to, label, children }) => (
  <Link
    to={to}
    aria-label={label}
    className="relative rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:outline-none"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const cartCount =
    user?.data?.cart?.length ??
    JSON.parse(localStorage.getItem('cart') || '[]').length;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <h1 className="brand_name text-xl text-zinc-900">CartLoop</h1>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <IconLink to={isAuthenticated ? '/profile' : '/login'} label="Account">
              <User className="h-5 w-5" />
            </IconLink>
            <IconLink to="/wishlist" label="Wishlist">
              <Heart className="h-5 w-5" />
            </IconLink>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:outline-none"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {user && isAuthenticated && user?.data?.role === 'vendor' && (
              <IconLink to="/vendor" label="Vendor dashboard">
                <RiAdminLine className="h-5 w-5" />
              </IconLink>
            )}

            <button
              className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="flex flex-col gap-1 border-t border-zinc-100 py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-lg px-2 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
