import React from "react";
import {
  ShoppingCart,
  Heart,
  MapPin,
  CreditCard,
  Search,
  User,
  Menu,
  X,
  LocationEdit,
  LucideLocationEdit,
  CardSim,
} from "lucide-react";
import { useEcommerce } from "../../contexts/EcommerceContext";

const Navigation = () => {
  const { currentPage, setCurrentPage, getCartItemsCount, wishlistItems } =
    useEcommerce();

  const navItems = [
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingCart,
      badge: getCartItemsCount(),
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      badge: wishlistItems.length,
    },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
  ];

  return (
    <>
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
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className="text-gray-700 hover:text-amber-600 transition-colors duration-200 flex flex-col gap-0 items-center cursor-pointer"
                    // className={`relative flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    //   isActive
                    //     ? "bg-blue-50 text-blue-600 shadow-sm"
                    //     : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    // }`}
                  >
                    <IconComponent className="h-5 w-5 hover:-translate-y-1 hover:scale-105 hover:duration-200" />
                    <span className="text-xs font-medium hidden md:block">
                      {item.label}
                    </span>
                    {/* {item.badge && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )} */}
                  </button>
                );
              })}
             
            </div>
          </div>

        
        </div>
      </header>
      {/* <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">ShopHub</h1>
            </div>

            <div className="flex space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`relative flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Navigation;
