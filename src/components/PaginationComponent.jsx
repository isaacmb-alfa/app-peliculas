import React, { useState, useEffect } from 'react';

function PaginationComponent({ totalResults, resultsPerPage, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalResults / resultsPerPage) || 0;
    const [visiblePages, setVisiblePages] = useState([]);

    useEffect(() => {
        const generateVisiblePages = () => {
            const pages = [];
            const startPage = Math.max(1, currentPage - 4);
            const endPage = Math.min(totalPages, currentPage + 5);
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            setVisiblePages(pages);
        };

        generateVisiblePages();
    }, [currentPage, totalPages]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    }
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };
    const handleJumpForward = () => {
        const jumpPage = Math.min(currentPage + 10, totalPages);
        handlePageChange(jumpPage);
    };
    const handleJumpBackward = () => {
        const jumpPage = Math.max(currentPage - 10, 1);
        handlePageChange(jumpPage);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4 rounded-lg">
            <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    {resultsPerPage} resultados de {totalResults}
                </span>
                <ul className="flex items-center space-x-1 md:space-x-3">
                    <li>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}
                        >
                            Anterior
                        </button>
                    </li>
                    {visiblePages.map((page) => (
                        <li key={page}>
                            <button
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-2 rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={handleJumpForward}
                            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg"
                        >
                            ...
                        </button>
                    </li>
                    <li>
                        <span className="text-xl text-gray-700 dark:text-gray-400">
                            {totalPages}
                        </span>
                    </li>
                    <li>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}
                        >
                            Siguiente
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )

};

export default PaginationComponent;
