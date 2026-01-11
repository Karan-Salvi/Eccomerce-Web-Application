import React, { useState, useMemo, useEffect } from 'react';
import { Grid, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { SearchBar } from '@/components/Products/SearchBar';
import { FilterSidebar } from '@/components/Products/FilterSidebar';
import { ProductGrid } from '@/components/Products/ProductGrid';
import { Pagination } from '@/components/Products/Pagination';
import { useGetAllProductsByPageQuery } from '@/store/api/productApi';
import Navbar from '@/components/Home/Navbar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../components/ui/input-group';
import { Button } from '@/components/ui/button';
import { PRODUCT_SORT } from '../../constants/productSort.constants';
const PRODUCTS_PER_PAGE = 12;

function Products() {
  //const { data: productsData, isLoading, isError } = useGetAllProductsQuery();

  // console.log("All the product data is : ", productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(PRODUCT_SORT.FEATURED);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 100000],
    minRating: 0,
    inStockOnly: false,
  });
  const { data: productsData, isLoading } = useGetAllProductsByPageQuery({
    page: currentPage,
    limit: 12,
    sort: sortBy,
    category: filters.categories.join(','),
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1],
    minRating: filters.minRating,
    inStock: filters.inStockOnly,
    search: searchTerm,
  });

  console.log('Products Data in Product Page: ', productsData);

  // useEffect(() => {
  //   setProducts(productsData?.data);
  // }, [productsData, currentPage]);

  // // Filter and search products
  // const filteredProducts = useMemo(() => {
  //   let filtered = products?.filter((product) => {
  //     // Search filter
  //     const matchesSearch =
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.brand.toLowerCase().includes(searchTerm.toLowerCase());

  //     // Category filter
  //     const matchesCategory =
  //       filters.categories.length === 0 ||
  //       filters.categories.includes(product.category);

  //     // Brand filter
  //     const matchesBrand =
  //       filters.brands.length === 0 || filters.brands.includes(product.brand);

  //     // Price filter
  //     const matchesPrice =
  //       product.price >= filters.priceRange[0] &&
  //       product.price <= filters.priceRange[1];

  //     // Rating filter
  //     const matchesRating = product.ratings >= filters.minRating;

  //     // Stock filter
  //     // const matchesStock = !filters.inStockOnly || product.inStock;
  //     const matchesStock = !filters.inStockOnly || product.inStock > 0;
  //     //   //matchesStock

  //     return (
  //       matchesSearch &&
  //       matchesCategory &&
  //       matchesBrand &&
  //       matchesPrice &&
  //       matchesRating &&
  //       matchesStock
  //     );
  //   });

  //   // Sort products
  //   switch (sortBy) {
  //     case 'price-low':
  //       filtered.sort((a, b) => a.price - b.price);
  //       break;
  //     case 'price-high':
  //       filtered.sort((a, b) => b.price - a.price);
  //       break;
  //     case 'rating':
  //       filtered.sort((a, b) => b.rating - a.rating);
  //       break;
  //     case 'newest':
  //       filtered.sort((a, b) => b._id - a._id);
  //       break;
  //     case 'featured':
  //     default:
  //       filtered?.sort((a, b) => {
  //         if (a.featured && !b.featured) return -1;
  //         if (!a.featured && b.featured) return 1;
  //         return b.rating - a.rating;
  //       });
  //   }

  //   return filtered;
  // }, [searchTerm, filters, sortBy, products, currentPage]);

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

      <div className="max-w-8xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-bold text-gray-900">
                  Products
                </h2>
                <p className="text-gray-600">
                  Showing {productsData?.products?.length} of{' '}
                  {productsData?.products?.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                <InputGroup>
                  <InputGroupInput
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  {/* <InputGroupAddon align="inline-end">
                    12 results
                  </InputGroupAddon> */}
                </InputGroup>

                {/* <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                /> */}
                {/* Mobile Filter Toggle */}

                <Button
                  onClick={() => setIsSidebarOpen(true)}
                  variant="outline"
                  className="cursor-pointer lg:hidden"
                >
                  <SlidersHorizontal className="h-[100px] w-[100px]" />
                  <span className="text-sm font-medium">Filters</span>
                </Button>
                {/* <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-sm font-medium">Filters</span>
                </button> */}

                {/* Sort Dropdown */}
                {/* <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-orange-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select> */}

                <Select
                  className="cursor-pointer"
                  defaultValue={PRODUCT_SORT.FEATURED}
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort By</SelectLabel>
                      <SelectItem value={PRODUCT_SORT.FEATURED}>
                        Featured
                      </SelectItem>
                      <SelectItem value={PRODUCT_SORT.NEWEST}>
                        Newest
                      </SelectItem>
                      <SelectItem value={PRODUCT_SORT.PRICE_ASC}>
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value={PRODUCT_SORT.PRICE_DESC}>
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value={PRODUCT_SORT.RATING}>
                        Highest Rated
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden items-center overflow-hidden rounded-lg border border-gray-300 sm:flex">
                  <button className="bg-blue-50 p-2 text-orange-600">
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:bg-gray-50">
                    <Grid className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={productsData?.products || []}
              loading={isLoading}
            />

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
