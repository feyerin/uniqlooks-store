interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 3,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Hitung range page yang ditampilkan
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  // Sesuaikan startPage jika endPage berada di ujung
  startPage = Math.max(1, endPage - maxVisible + 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev Button */}
      <button
        className="px-3 py-1 rounded-md border text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {startPage > 1 && (
        <>
          <button
            className="px-3 py-1 rounded-md border text-sm hover:bg-gray-100"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded-md border text-sm hover:bg-gray-100 ${
            page === currentPage ? "bg-black text-white border-black" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            className="px-3 py-1 rounded-md border text-sm hover:bg-gray-100"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        className="px-3 py-1 rounded-md border text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}