import React, { useState, useEffect } from 'react';

const MobilePagination = ({ totalResults, resultsPerPage, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalResults / resultsPerPage) || 0;
    const [visiblePages, setVisiblePages] = useState([]);
    const [inputPage, setInputPage] = useState(''); 

    useEffect(() => {
            const generateVisiblePages = () => {
                const pages = [];
                const startPage = Math.max(1, currentPage - 2);
                const endPage = Math.min(totalPages, currentPage + 2);
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
        setInputPage(''); 
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handleInputChange = (event) => {
        setInputPage(event.target.value.replace(/\D/g, '')); 
    };

    const handleGoToPage = () => {
        const newPage = parseInt(inputPage, 10);
        if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
            handlePageChange(newPage);
        } else if (inputPage !== '') {
            alert("Ingresa una página valida")
        }
    };

    useEffect(() => {
        const generateVisiblePages = () => {
            let pages = [];
            if (totalPages <= 3) {
                pages = Array.from({ length: totalPages }, (_, i) => i + 1);
            } else {
                let start = Math.max(1, currentPage - 1);
                let end = Math.min(totalPages, currentPage + 1);

                if (end - start < 2) {
                    if (start === 1) {
                        end = Math.min(3, totalPages);
                    } else if (end === totalPages) {
                        start = Math.max(1, totalPages - 2);
                    }
                }
                pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
            }
            setVisiblePages(pages);
        };
        generateVisiblePages();
    }, [currentPage, totalPages]);

    const ArrowLeft = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    );
    const ArrowRight = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    );

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4 rounded-lg block lg:hidden">
            <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    {resultsPerPage} resultados de {totalResults}
                </span>
                <div className="flex items-center space-x-2">
                    <div className="flex rounded border border-gray-300"> {/* Contenedor para input y botón */}
                        <input
                            type="text"
                            placeholder="Ir a página"
                            value={inputPage} // Usar el estado para el valor
                            onChange={handleInputChange}
                            className="px-2 py-1 text-center w-20 border-none focus:ring-0" // Quitar border y focus ring
                        />
                        <button
                            onClick={handleGoToPage} onSubmit={handleGoToPage}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 rounded-r"
                        >
                            Ir
                        </button>
                    </div>
                    <ul className="flex items-center space-x-1">
                        <li>
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`px-2 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                            >
                                <ArrowLeft />
                            </button>
                        </li>
                        {visiblePages.map((page) => (
                            <li key={page}>
                                <button
                                    onClick={() => handlePageChange(page)}
                                    className={`px-2 py-1 rounded-lg ${page === currentPage ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-2 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                            >
                                <ArrowRight />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MobilePagination;