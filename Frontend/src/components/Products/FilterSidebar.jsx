import React, { useState } from 'react';
import { Filter, X, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCT_CATEGORY_OPTIONS } from '../../constants/productCategories.constants';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  isOpen,
  onToggle,
}) => {
  /* ---------- UI STATE (ONLY) ---------- */
  const [open, setOpen] = useState({
    category: true,
    price: true,
    rating: true,
  });

  /* ---------- HANDLERS (UNCHANGED) ---------- */
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
    onFilterChange({ ...filters, minRating: rating });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      minRating: 0,
      inStockOnly: false,
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] border-r bg-white transition-transform duration-300 lg:static lg:z-0 lg:rounded-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter size={16} />
            Filters
          </div>
          <button className="lg:hidden" onClick={onToggle}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-140px)] space-y-5 overflow-y-auto px-4 py-4 text-sm">
          {/* ---------- CATEGORY ---------- */}
          <Section
            title="Category"
            open={open.category}
            toggle={() => setOpen((s) => ({ ...s, category: !s.category }))}
          >
            {PRODUCT_CATEGORY_OPTIONS.map((category) => (
              <label key={category.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={filters.categories.includes(category.value)}
                  onChange={() => handleCategoryChange(category.value)}
                />
                <span>{category.label}</span>
              </label>
            ))}
          </Section>

          {/* ---------- PRICE RANGE ---------- */}
          <Section
            title="Price Range"
            open={open.price}
            toggle={() => setOpen((s) => ({ ...s, price: !s.price }))}
          >
            {/* Inputs */}
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handlePriceChange(
                    Number(e.target.value),
                    filters.priceRange[1]
                  )
                }
                className="w-full rounded border px-2 py-1 text-sm"
              />
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceChange(
                    filters.priceRange[0],
                    Number(e.target.value)
                  )
                }
                className="w-full rounded border px-2 py-1 text-sm"
              />
            </div>

            {/* Dual Range Slider */}
            <div className="relative mt-4 h-6 overflow-hidden px-2">
              {/* Track */}
              <div className="absolute top-1/2 right-2 left-2 h-1 -translate-y-1/2 rounded bg-gray-300" />

              {/* Active Range */}
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-blue-600"
                style={{
                  left: `calc(${(filters.priceRange[0] / 1000) * 100}% + 8px)`,
                  right: `calc(${
                    100 - (filters.priceRange[1] / 1000) * 100
                  }% + 8px)`,
                }}
              />

              {/* Min Thumb */}
              <input
                type="range"
                min={0}
                max={1000}
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handlePriceChange(
                    Math.min(Number(e.target.value), filters.priceRange[1] - 1),
                    filters.priceRange[1]
                  )
                }
                className="range-thumb"
              />

              {/* Max Thumb */}
              <input
                type="range"
                min={0}
                max={1000}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceChange(
                    filters.priceRange[0],
                    Math.max(Number(e.target.value), filters.priceRange[0] + 1)
                  )
                }
                className="range-thumb"
              />
            </div>
          </Section>

          {/* ---------- RATING ---------- */}
          <Section
            title="Rating"
            open={open.rating}
            toggle={() => setOpen((s) => ({ ...s, rating: !s.rating }))}
          >
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < rating
                          ? 'fill-blue-500 text-blue-500'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
              </label>
            ))}
          </Section>

          {/* ---------- STOCK ---------- */}
          <div className="flex items-center justify-between">
            <span>Only in Stock</span>
            <button
              onClick={() =>
                onFilterChange({
                  ...filters,
                  inStockOnly: !filters.inStockOnly,
                })
              }
              className={`relative h-5 w-10 rounded-full transition ${
                filters.inStockOnly ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                  filters.inStockOnly ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 border-t px-4 py-3">
          <button className="flex-1 rounded bg-blue-600 py-2 text-sm text-white">
            1 984 items
          </button>
          <button
            onClick={clearFilters}
            className="rounded border px-4 py-2 text-sm"
          >
            Clear
          </button>
        </div>
      </aside>
    </>
  );
};

/* ---------- SECTION COMPONENT ---------- */
const Section = ({ title, open, toggle, children }) => (
  <div>
    <button
      onClick={toggle}
      className="mb-2 flex w-full items-center justify-between font-medium"
    >
      {title}
      {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>

    {open && <div className="space-y-2 text-gray-700">{children}</div>}
  </div>
);
