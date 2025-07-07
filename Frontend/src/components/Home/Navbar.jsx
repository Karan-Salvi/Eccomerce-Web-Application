import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import React from "react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                TrendyCart
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="/products"
              className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              Deals
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-amber-600 transition-colors duration-200 cursor-pointer">
              <Search className="h-5 w-5" />
            </button>
            <a
              href="/vendor"
              className="text-gray-700 hover:text-amber-600 transition-colors duration-200"
            >
              <User className="h-5 w-5" />
            </a>
            <button className="relative text-gray-700 hover:text-amber-600 transition-colors duration-200 cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-amber-600 transition-colors duration-200"
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
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Deals
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
