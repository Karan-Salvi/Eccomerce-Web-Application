import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
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

    return pages;
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'cursor-not-allowed text-zinc-300'
            : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
        }`}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Previous
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            aria-current={currentPage === page}
            className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'cursor-not-allowed text-zinc-300'
            : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
        }`}
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  );
};
