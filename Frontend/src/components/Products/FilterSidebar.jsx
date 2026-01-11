// import React from "react";
// import { Filter, X, Star } from "lucide-react";

// import { categories, brands } from "../../data/products";
// import { PRODUCT_CATEGORY_OPTIONS } from "../../constants/productCategories.constants";

// export const FilterSidebar = ({
//   filters,
//   onFilterChange,
//   isOpen,
//   onToggle,
// }) => {
//   const handleCategoryChange = (category) => {
//     const newCategories = filters.categories.includes(category)
//       ? filters.categories.filter((c) => c !== category)
//       : [...filters.categories, category];

//     onFilterChange({ ...filters, categories: newCategories });
//   };

//   const handleBrandChange = (brand) => {
//     const newBrands = filters.brands.includes(brand)
//       ? filters.brands.filter((b) => b !== brand)
//       : [...filters.brands, brand];

//     onFilterChange({ ...filters, brands: newBrands });
//   };

//   const handlePriceChange = (min, max) => {
//     onFilterChange({ ...filters, priceRange: [min, max] });
//   };

//   const handleRatingChange = (rating) => {
//     onFilterChange({ ...filters, minRating: rating });
//   };

//   const clearFilters = () => {
//     onFilterChange({
//       categories: [],
//       brands: [],
//       priceRange: [0, 1000],
//       minRating: 0,
//       inStockOnly: false,
//     });
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
//           onClick={onToggle}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-full lg:h-auto w-80 bg-white shadow-lg lg:shadow-none transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         } overflow-y-auto`}
//       >
//         <div className="p-6">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-2">
//               <Filter className="h-5 w-5 text-gray-600" />
//               <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={clearFilters}
//                 className="text-sm text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
//               >
//                 Clear All
//               </button>
//               <button
//                 onClick={onToggle}
//                 className="lg:hidden p-1 hover:bg-gray-100 rounded cursor-pointer"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           <div className="space-y-6">
//             {/* Categories */}
//             <div>
//               <h3 className="text-sm font-medium text-gray-900 mb-3">
//                 Categories
//               </h3>
//               <div className="space-y-2">
//                 {PRODUCT_CATEGORY_OPTIONS.map((category) => (
//                   <label key={category.value} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={filters.categories.includes(category.value)}
//                       onChange={() => handleCategoryChange(category.value)}
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">
//                       {category.label}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Brands */}
//             {/* <div>
//               <h3 className="text-sm font-medium text-gray-900 mb-3">Brands</h3>
//               <div className="space-y-2">
//                 {brands.map((brand) => (
//                   <label key={brand} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={filters.brands.includes(brand)}
//                       onChange={() => handleBrandChange(brand)}
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">{brand}</span>
//                   </label>
//                 ))}
//               </div>
//             </div> */}

//             {/* Price Range */}
//             <div>
//               <h3 className="text-sm font-medium text-gray-900 mb-3">
//                 Price Range
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     value={filters.priceRange[0]}
//                     onChange={(e) =>
//                       handlePriceChange(
//                         Number(e.target.value),
//                         filters.priceRange[1]
//                       )
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   <span className="text-gray-500">-</span>
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     value={filters.priceRange[1]}
//                     onChange={(e) =>
//                       handlePriceChange(
//                         filters.priceRange[0],
//                         Number(e.target.value)
//                       )
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   {[
//                     { label: "Under ₹50", range: [0, 50] },
//                     { label: "₹50-₹200", range: [50, 200] },
//                     { label: "₹200-₹500", range: [200, 500] },
//                     { label: "Over ₹500", range: [500, 1000] },
//                   ].map((preset) => (
//                     <button
//                       key={preset.label}
//                       onClick={() =>
//                         handlePriceChange(preset.range[0], preset.range[1])
//                       }
//                       className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
//                     >
//                       {preset.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Rating */}
//             <div>
//               <h3 className="text-sm font-medium text-gray-900 mb-3">
//                 Minimum Rating
//               </h3>
//               <div className="space-y-2">
//                 {[4, 3, 2, 1].map((rating) => (
//                   <label
//                     key={rating}
//                     className="flex items-center cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       name="rating"
//                       checked={filters.minRating === rating}
//                       onChange={() => handleRatingChange(rating)}
//                       className="text-blue-600 focus:ring-blue-500"
//                     />
//                     <div className="ml-2 flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`h-4 w-4 ${
//                             i < rating
//                               ? "text-yellow-400 fill-current"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                       <span className="ml-1 text-sm text-gray-700">& up</span>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* In Stock Only */}
//             <div>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={filters.inStockOnly}
//                   onChange={(e) =>
//                     onFilterChange({
//                       ...filters,
//                       inStockOnly: e.target.checked,
//                     })
//                   }
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">
//                   In stock only
//                 </span>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// import React from "react";
// import { Filter, X, Star, ChevronDown, ChevronRight } from "lucide-react";
// import { PRODUCT_CATEGORY_OPTIONS } from "../../constants/productCategories.constants";

// export const FilterSidebar = ({
//   filters,
//   onFilterChange,
//   isOpen,
//   onToggle,
// }) => {
//   const handleCategoryChange = (category) => {
//     const newCategories = filters.categories.includes(category)
//       ? filters.categories.filter((c) => c !== category)
//       : [...filters.categories, category];

//     onFilterChange({ ...filters, categories: newCategories });
//   };

//   const handlePriceChange = (min, max) => {
//     onFilterChange({ ...filters, priceRange: [min, max] });
//   };

//   const handleRatingChange = (rating) => {
//     onFilterChange({ ...filters, minRating: rating });
//   };

//   const clearFilters = () => {
//     onFilterChange({
//       categories: [],
//       brands: [],
//       priceRange: [0, 1000],
//       minRating: 0,
//       inStockOnly: false,
//     });
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/40 lg:hidden"
//           onClick={onToggle}
//         />
//       )}

//       <aside
//         className={`sm:rounded-lg fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-white border-r transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <div className="flex items-center gap-2 text-sm font-medium">
//             <Filter size={16} />
//             Filters
//           </div>
//           <button className="lg:hidden" onClick={onToggle}>
//             <X size={18} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="px-4 py-4 space-y-5 text-sm overflow-y-auto h-[calc(100vh-140px)]">
//           {/* Category */}
//           <Section title="Category">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" />
//               <span>All</span>
//             </label>

//             {PRODUCT_CATEGORY_OPTIONS.map((category) => (
//               <label key={category.value} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={filters.categories.includes(category.value)}
//                   onChange={() => handleCategoryChange(category.value)}
//                 />
//                 <span>{category.label}</span>
//               </label>
//             ))}
//           </Section>

//           {/* Price */}
//           <Section title="Price Range">
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 value={filters.priceRange[0]}
//                 className="w-full border rounded px-2 py-1"
//               />
//               <input
//                 type="number"
//                 value={filters.priceRange[1]}
//                 className="w-full border rounded px-2 py-1"
//               />
//             </div>

//             {/* Fake slider look */}
//             <div className="relative mt-3 h-1 bg-gray-200 rounded">
//               <div className="absolute left-1/4 right-1/4 h-1 bg-blue-500 rounded" />
//               <div className="absolute left-1/4 -top-1 w-3 h-3 bg-white border rounded-full" />
//               <div className="absolute right-1/4 -top-1 w-3 h-3 bg-white border rounded-full" />
//             </div>
//           </Section>

//           {/* Rating */}
//           <Section title="Rating">
//             {[4, 3, 2, 1].map((rating) => (
//               <label key={rating} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={filters.minRating === rating}
//                   onChange={() => handleRatingChange(rating)}
//                 />
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={14}
//                       className={
//                         i < rating
//                           ? "text-blue-500 fill-blue-500"
//                           : "text-gray-300"
//                       }
//                     />
//                   ))}
//                 </div>
//               </label>
//             ))}
//           </Section>

//           {/* In Stock */}
//           <div className="flex items-center justify-between">
//             <span>Only in Stock</span>
//             <button
//               onClick={() =>
//                 onFilterChange({
//                   ...filters,
//                   inStockOnly: !filters.inStockOnly,
//                 })
//               }
//               className={`w-10 h-5 rounded-full relative transition ${
//                 filters.inStockOnly ? "bg-blue-500" : "bg-gray-300"
//               }`}
//             >
//               <span
//                 className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition ${
//                   filters.inStockOnly ? "right-0.5" : "left-0.5"
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-4 py-3 border-t flex gap-2">
//           <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm">
//             1 984 items
//           </button>
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2 border rounded text-sm"
//           >
//             Clear
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// /* ---------- Helper ---------- */

// const Section = ({ title, children }) => (
//   <div>
//     <div className="flex items-center justify-between mb-2 font-medium">
//       {title}
//       <ChevronDown size={16} className="text-gray-400" />
//     </div>
//     <div className="space-y-2 text-gray-700">{children}</div>
//   </div>
// );
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
