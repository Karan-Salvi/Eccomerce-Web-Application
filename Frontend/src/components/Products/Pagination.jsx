import { ChevronLeft, ChevronRight } from 'lucide-react';

// { currentPage, totalPages, onPageChange }

export const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  // if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'cursor-not-allowed text-gray-400'
            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
        }`}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'cursor-not-allowed text-gray-400'
            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
        }`}
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  );
};
