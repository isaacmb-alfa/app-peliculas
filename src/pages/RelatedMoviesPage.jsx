import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../components/SearchContext';
import CardComponentHZ from '../components/CardComponentHZ';
import NavBarComponent from '../components/NavBarComponent';
import PaginationComponent from '../components/PaginationComponent';
import MobilePagination from '../components/MobilePagination';
import FooterComponent from '../components/FooterComponent';

const RelatedMoviesPage = () => {
    const { idMovie } = useParams();
    const { setSearchResults } = useContext(SearchContext);
    const [relatedMovies, setRelatedMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('es-MX');
    const location = useLocation();
    const movieTitle = new URLSearchParams(location.search).get('title');

    const [currentPage, setCurrentPage] = useState(() => {
        const pageFromUrl = new URLSearchParams(location.search).get('page');
        return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
    });
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const handleSearch = (term) => {
        setCurrentSearchTerm(term);
        navigate(`/search-result/${term}`);
    };

    const handleSelectChange = (value) => {
        setLanguage(value);
        localStorage.setItem('language', value);
    };

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const fetchRelatedMovies = async (page = 1) => {
        setLoading(true);
        setError(null);
        const url = `https://api.themoviedb.org/3/movie/${idMovie}/similar?language=${language}&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: import.meta.env.VITE_TOKEN_API,
            },
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRelatedMovies(data.results);
            setTotalPages(data);
        } catch (err) {
            console.error('Error fetching related movies:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRelatedMovies(currentPage);
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('page', currentPage);
        navigate({ search: urlParams.toString() }, { replace: true });
    }, [language, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div className="text-center mt-8 text-white text-3xl">Cargando películas relacionadas...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500 text-3xl">Error al cargar las películas relacionadas.</div>;
    }

    if (!relatedMovies || relatedMovies.length === 0) {
        return <div className="text-center mt-8 text-white text-3xl">No se encontraron películas relacionadas.</div>
    }
    console.log(currentPage);

    return (
        <>
            <NavBarComponent 
            onSelectChange={handleSelectChange} 
            onSearch={handleSearch} 
            handleSearchResults={handleSearchResults} />
            <div className="min-h-screen bg-gray-900 text-white p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Películas similares a: {movieTitle}</h1>
                <div className="flex flex-wrap justify-start">
                    {relatedMovies?.map((movie, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 p-2">
                            <CardComponentHZ movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
            <PaginationComponent 
            totalResults={totalPages?.total_results} 
            resultsPerPage={totalPages.results?.length} 
                currentPageOptional={currentPage}
            onPageChange={handlePageChange} />
            <MobilePagination 
            totalResults={totalPages?.total_results} 
            resultsPerPage={totalPages.results?.length} 
                currentPageOptional={currentPage}
            onPageChange={handlePageChange} />
            <FooterComponent />
        </>
    );
};

export default RelatedMoviesPage;
