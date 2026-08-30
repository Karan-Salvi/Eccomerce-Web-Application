import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
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
import { PRODUCT_SORT } from '../../constants/productSort.constants';
import { MAX_PRICE } from '../../constants/productFilters.constants';

function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(PRODUCT_SORT.FEATURED);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
    priceRange: [0, MAX_PRICE],
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortBy]);

  const products = productsData?.products || [];
  const totalProducts =
    productsData?.pagination?.totalProducts ?? products.length;
  const totalPages = productsData?.pagination?.totalPages || 1;

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            resultCount={totalProducts}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
                  Products
                </h1>
                <p className="mt-1 text-zinc-600">
                  {isLoading ? 'Loading...' : `${totalProducts} products`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full min-w-0 rounded-lg border border-zinc-300 py-2 pr-3 pl-9 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none sm:w-56"
                  />
                </div>

                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-300 px-3.5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[170px] cursor-pointer rounded-lg">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
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
              </div>
            </div>

            <ProductGrid products={products} loading={isLoading} />

            {!isLoading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
