'use client';

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
    if (lastPage <= 1) return null;

    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <div className="flex justify-start mt-6">
            <div className="flex flex-wrap -mb-1">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`mb-1 mr-1 px-4 py-3 text-sm leading-4 border rounded focus:text-indigo-500 focus:border-indigo-500 hover:bg-white transition-colors ${
                        currentPage === 1
                            ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                            : 'text-gray-700 hover:text-indigo-600'
                    }`}
                >
                    « Previous
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`mb-1 mr-1 px-4 py-3 text-sm leading-4 border rounded focus:text-indigo-500 focus:border-indigo-500 hover:bg-white transition-colors ${
                            page === currentPage
                                ? 'bg-white border-indigo-500 text-indigo-600 font-medium shadow-sm'
                                : 'text-gray-700 bg-gray-50 hover:text-indigo-600'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(Math.min(lastPage, currentPage + 1))}
                    disabled={currentPage === lastPage}
                    className={`mb-1 mr-1 px-4 py-3 text-sm leading-4 border rounded focus:text-indigo-500 focus:border-indigo-500 hover:bg-white transition-colors ${
                        currentPage === lastPage
                            ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                            : 'text-gray-700 hover:text-indigo-600'
                    }`}
                >
                    Next »
                </button>
            </div>
        </div>
    );
}
