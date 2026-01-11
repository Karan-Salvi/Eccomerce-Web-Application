import { ShoppingCart, Heart } from 'lucide-react';

const Navigation = () => {
  // const { currentPage, setCurrentPage, getCartItemsCount, wishlistItems } =
  //   useEcommerce();

  const navItems = [
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingCart,
      badge: 2,
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      badge: 2,
    },
    // { id: "addresses", label: "Addresses", icon: MapPin },
    // { id: "payment", label: "Payment", icon: CreditCard },
  ];

  return (
    <>
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
              <a
                href="/"
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                Home
              </a>
              <a
                href="/products"
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                Categories
              </a>
              <a
                href="#"
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                Deals
              </a>
              <a
                href="#"
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                About
              </a>
              <a
                href="#"
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-amber-600"
              >
                Contact
              </a>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                // const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    // onClick={() => setCurrentPage(item.id)}
                    className="flex cursor-pointer flex-col items-center gap-0 text-gray-700 transition-colors duration-200 hover:text-amber-600"
                    // className={`relative flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    //   isActive
                    //     ? "bg-blue-50 text-blue-600 shadow-sm"
                    //     : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    // }`}
                  >
                    <IconComponent className="h-5 w-5 hover:-translate-y-1 hover:scale-105 hover:duration-200" />
                    <span className="hidden text-xs font-medium md:block">
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
