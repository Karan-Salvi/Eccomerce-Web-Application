import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4.5 w-4.5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full rounded-lg border border-gray-300 bg-white p-2 pr-3 pl-10 leading-5 placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />
    </div>
  );
};
