import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoopMark } from './LoopMark';

const categoryLinks = [
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Fashion', value: 'Fashion' },
  { label: 'Home & Kitchen', value: 'Home & Kitchen' },
  { label: 'Sports & Fitness', value: 'Sports & Fitness' },
];

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <LoopMark className="h-5 w-8 text-amber-600" />
              <h3 className="brand_name text-xl text-zinc-900">CartLoop</h3>
            </div>
            <p className="mt-4 max-w-md leading-relaxed text-zinc-600">
              Electronics, fashion, home and more, from vendors we vet
              ourselves.
            </p>
            <a
              href="mailto:support@cartloop.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-amber-600"
            >
              <Mail className="h-4 w-4" />
              support@cartloop.com
            </a>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
              Categories
            </h4>
            <ul className="space-y-3">
              {categoryLinks.map((category) => (
                <li key={category.value}>
                  <Link
                    to={`/products?category=${encodeURIComponent(category.value)}`}
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-zinc-200 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © 2026 <span className="brand_name">CartLoop</span>. All rights
            reserved.
          </p>
          <LoopMark className="h-3 w-5 text-zinc-300" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
