import React, { useState } from 'react';
import { Filter, X, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCT_CATEGORY_OPTIONS } from '../../constants/productCategories.constants';
import { MAX_PRICE } from '../../constants/productFilters.constants';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  isOpen,
  onToggle,
  resultCount,
}) => {
  const [open, setOpen] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (min, max) => {
    if (min > max) return;
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, MAX_PRICE],
      minRating: 0,
      inStockOnly: false,
    });
  };

  const isPriceDefault =
    filters.priceRange[0] === 0 && filters.priceRange[1] === MAX_PRICE;
  const activeCount =
    filters.categories.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (isPriceDefault ? 0 : 1);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-zinc-200 bg-white transition-transform duration-300 lg:static lg:z-0 lg:rounded-2xl lg:border ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
            <Filter size={16} />
            Filters
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 text-xs font-semibold text-amber-800">
                {activeCount}
              </span>
            )}
          </div>
          <button
            className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 lg:hidden"
            onClick={onToggle}
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 divide-y divide-zinc-100 overflow-y-auto px-5 text-sm">
          <Section
            title="Category"
            open={open.category}
            toggle={() => setOpen((s) => ({ ...s, category: !s.category }))}
          >
            {PRODUCT_CATEGORY_OPTIONS.map((category) => {
              const checked = filters.categories.includes(category.value);
              return (
                <label
                  key={category.value}
                  className={`-mx-2 flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-50 ${
                    checked ? 'bg-amber-50' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-amber-600 focus:ring-amber-600"
                    checked={checked}
                    onChange={() => handleCategoryChange(category.value)}
                  />
                  <span
                    className={checked ? 'font-medium text-amber-900' : 'text-zinc-700'}
                  >
                    {category.label}
                  </span>
                </label>
              );
            })}
          </Section>

          <Section
            title="Price Range"
            open={open.price}
            toggle={() => setOpen((s) => ({ ...s, price: !s.price }))}
          >
            <p className="mb-3 text-xs text-zinc-500">
              ₹{filters.priceRange[0].toLocaleString('en-IN')} to ₹
              {filters.priceRange[1].toLocaleString('en-IN')}
            </p>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-zinc-400">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  max={MAX_PRICE}
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    handlePriceChange(
                      Number(e.target.value),
                      filters.priceRange[1]
                    )
                  }
                  className="w-full rounded-lg border border-zinc-300 py-1.5 pr-2 pl-6 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
              </div>
              <span className="text-zinc-400">to</span>
              <div className="relative flex-1">
                <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-zinc-400">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  max={MAX_PRICE}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange(
                      filters.priceRange[0],
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border border-zinc-300 py-1.5 pr-2 pl-6 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="relative mt-4 h-6 overflow-hidden px-2">
              <div className="absolute top-1/2 right-2 left-2 h-1 -translate-y-1/2 rounded-full bg-zinc-200" />
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-amber-600"
                style={{
                  left: `calc(${(filters.priceRange[0] / MAX_PRICE) * 100}% + 8px)`,
                  right: `calc(${
                    100 - (filters.priceRange[1] / MAX_PRICE) * 100
                  }% + 8px)`,
                }}
              />
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handlePriceChange(
                    Math.min(
                      Number(e.target.value),
                      filters.priceRange[1] - 1
                    ),
                    filters.priceRange[1]
                  )
                }
                className="range-thumb"
              />
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceChange(
                    filters.priceRange[0],
                    Math.max(
                      Number(e.target.value),
                      filters.priceRange[0] + 1
                    )
                  )
                }
                className="range-thumb"
              />
            </div>
          </Section>

          <Section
            title="Rating"
            open={open.rating}
            toggle={() => setOpen((s) => ({ ...s, rating: !s.rating }))}
          >
            {[4, 3, 2, 1].map((rating) => {
              const checked = filters.minRating === rating;
              return (
                <label
                  key={rating}
                  className={`-mx-2 flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-50 ${
                    checked ? 'bg-amber-50' : ''
                  }`}
                >
                  <input
                    type="radio"
                    className="cursor-pointer accent-amber-600"
                    checked={checked}
                    onChange={() => handleRatingChange(rating)}
                  />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-zinc-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500">& up</span>
                </label>
              );
            })}
          </Section>

          <div className="flex items-center justify-between py-4">
            <span className="text-zinc-700">Only in stock</span>
            <button
              onClick={() =>
                onFilterChange({
                  ...filters,
                  inStockOnly: !filters.inStockOnly,
                })
              }
              role="switch"
              aria-checked={filters.inStockOnly}
              aria-label="Only in stock"
              className={`relative h-5 w-10 cursor-pointer rounded-full transition-colors ${
                filters.inStockOnly ? 'bg-amber-600' : 'bg-zinc-300'
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                  filters.inStockOnly ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex gap-2 border-t border-zinc-200 px-5 py-4">
          <button
            onClick={onToggle}
            className="flex-1 cursor-pointer rounded-lg bg-zinc-900 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 lg:hidden"
          >
            Show {resultCount} results
          </button>
          <button
            onClick={clearFilters}
            disabled={activeCount === 0}
            className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:text-zinc-300 disabled:hover:bg-transparent lg:w-full"
          >
            Clear filters
          </button>
        </div>
      </aside>
    </>
  );
};

const Section = ({ title, open, toggle, children }) => (
  <div className="py-4">
    <button
      onClick={toggle}
      className="flex w-full cursor-pointer items-center justify-between font-semibold text-zinc-900"
    >
      {title}
      {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>

    {open && <div className="mt-3 space-y-1">{children}</div>}
  </div>
);
