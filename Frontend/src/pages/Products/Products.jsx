import React, { useState, useMemo, useEffect } from "react";
import {
  Menu,
  Grid,
  LayoutGrid,
  SlidersHorizontal,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { IoMdHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { SearchBar } from "../../components/Products/SearchBar";
import { FilterSidebar } from "../../components/Products/FilterSidebar";
import { ProductGrid } from "../../components/Products/ProductGrid";
import { Pagination } from "../../components/Products/Pagination";

import { Link } from "react-router-dom";
import {
  useGetAllProductsByPageQuery,
  useGetAllProductsQuery,
} from "../../store/api/productApi";

const PRODUCTS_PER_PAGE = 12;

function Products() {
  //const { data: productsData, isLoading, isError } = useGetAllProductsQuery();

  // console.log("All the product data is : ", productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 100000],
    minRating: 0,
    inStockOnly: false,
  });
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetAllProductsByPageQuery({ page: currentPage, limit: 12 });
  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    console.log("current page changed ", currentPage);
    setProducts(productsData?.data);
  }, [productsData, currentPage]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = products?.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      // Brand filter
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);

      // Price filter
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      // Rating filter
      const matchesRating = product.rating >= filters.minRating;

      // Stock filter
      const matchesStock = !filters.inStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      );
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "featured":
      default:
        filtered?.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [searchTerm, filters, sortBy, products, currentPage]);

  // Pagination
  // const totalPages = Math.ceil(filteredProducts?.length / PRODUCTS_PER_PAGE);
  // const paginatedProducts = filteredProducts;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">TrendyCart</h1>
              </div>
            </div>

            {/* Search Bar */}

            {/* User Actions */}
            <div className="flex items-center gap-1">
              <div className="hidden md:block flex-1 max-w-lg mx-8">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </div>
              <button className="hidden  sm:flex items-center gap-2 p-1  text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                {/* <Grid className="h-4 w-4" /> */}
                <IoMdHeart className="text-2xl text-pink-600" />
              </button>
              <Link
                to={"/cart"}
                className="relative text-gray-700 hover:text-amber-600 transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center cursor-pointer">
                  3
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Products
                </h2>
                <p className="text-gray-600">
                  Showing {filteredProducts?.length} of{" "}
                  {filteredProducts?.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-sm font-medium">Filters</span>
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button className="p-2 bg-blue-50 text-blue-600">
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 text-gray-400">
                    <Grid className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} loading={isLoading} />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
