import React, { useState, useMemo, useEffect } from "react";
import { Grid, LayoutGrid, SlidersHorizontal } from "lucide-react";

import { SearchBar } from "../../components/Products/SearchBar";
import { FilterSidebar } from "../../components/Products/FilterSidebar";
import { ProductGrid } from "../../components/Products/ProductGrid";
import { Pagination } from "../../components/Products/Pagination";

import { Link } from "react-router-dom";
import {
  useGetAllProductsByPageQuery,
  useGetAllProductsQuery,
} from "../../store/api/productApi";
import Navbar from "../../components/Home/Navbar";

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
      const matchesRating = product.ratings >= filters.minRating;

      // Stock filter
      // const matchesStock = !filters.inStockOnly || product.inStock;
      const matchesStock = !filters.inStockOnly || product.inStock > 0;
      //   //matchesStock

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
        filtered.sort((a, b) => b._id - a._id);
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
  // React.useEffect(() => {
  //   setCurrentPage(1);
  // }, [searchTerm, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

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
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
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
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button className="p-2 bg-blue-50 text-orange-600">
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
