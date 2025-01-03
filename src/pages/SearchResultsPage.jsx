import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import MovieCardComponent from '../components/MovieCardComponent';
import NavBarComponent from '../components/NavBarComponent';
import PaginationComponent from '../components/PaginationComponent';
import { SearchContext } from '../components/SearchContext';
import MobilePagination from './../components/MobilePagination';

const SearchResultsPage = () => {
    const { searchQuery } = useParams();
    const { searchResults, setSearchResults } = useContext(SearchContext);
    const [loading, setLoading] = useState(true);
    const [searchTermInput, setSearchTermInput] = useState('');
    const [error, setError] = useState(null);
    const [language, setLenguage] = useState(localStorage.getItem('language') || 'es-MX');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Función para manejar los resultados de búsqueda nuevos
    const handleSearchResults = (results, term) => {
        setSearchResults(results);
        setSearchTermInput(term || localStorage.getItem('searchTerm') || '');
        setCurrentPage(1);
        setSearchTerm('');
    };

    const fetchSearchResults = async (query, language, page = 1) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=${language}&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: import.meta.env.VITE_TOKEN_API
            }

        };

        try {
            setLoading(true);
            const response = await fetch(url, options);
            const data = await response.json();
            setSearchResults(data);
            localStorage.setItem('searchResults', JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            setError('Error fetching search results');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && savedLanguage !== language) {
            setLenguage(savedLanguage);
        }
    }, [language]);

    useEffect(() => {
        const savedResults = localStorage.getItem('searchResults');
        if (savedResults) {
            const parsedResults = JSON.parse(savedResults);
            setSearchResults(parsedResults);
        }
        const storedSearchTerm = localStorage.getItem('searchTerm');
        if (storedSearchTerm) {
            setSearchTerm(storedSearchTerm);
            setSearchTermInput(storedSearchTerm);
        }
    }, [setSearchResults]);

    useEffect(() => {  
        if (searchQuery) {
            fetchSearchResults(searchQuery, language, currentPage);
        } else {
            setLoading(false);
        }
    }, [currentPage ,searchQuery, language, ]);

    const handleSelectChange = (value) => {
        setLenguage(value);
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
    };

    const handleSearch = useCallback(
        (term) => {
            if (term.trim() === '') {
                navigate('/');
                return;
            }
            setSearchTerm(term);
            setSearchParams({ q: term });
            navigate(`/search-results/${term}`);
            setCurrentPage(1);
        },
        [navigate, setSearchParams]
    );
    console.log(currentPage);
    

    return (
        <div className="min-h-screen" style={{ background: 'rgb(10, 23, 40)' }}>
            <NavBarComponent handleSearchResults={handleSearchResults} onSelectChange={handleSelectChange} currentSearchTerm={searchTerm} onSearch={handleSearch} />
            <h1 className='text-4xl text-gray-100 text-center font-bold my-3'>
                Resultados de la búsqueda <span className='capitalize text-gray-400 underline'>{searchTermInput}</span>
            </h1>
            <div className="container flex justify-center p-5 gap-4 flex-wrap mx-auto">
                {loading && <div className="text-center mt-8 text-gray-100 text-3xl">Cargando...</div>}
                {error && <div className="text-center mt-8 text-red-500 text-3xl">{error}</div>}
                {searchResults && searchResults.results && searchResults.results.length > 0 ? (
                    <div className="flex flex-wrap mx-auto gap-4 justify-center">
                        {searchResults.results.map((movie, index) => (
                            <MovieCardComponent key={index} name={movie.title} image={movie.backdrop_path} description={movie.overview} id={movie.id} />
                        ))}
                    </div>
                ) : (!loading && !error && searchTerm && <div className="text-center mt-8 text-gray-100 text-3xl">No se encontraron resultados.</div>)}
            </div>
            <PaginationComponent
                totalResults={searchResults?.total_results}
                resultsPerPage={searchResults.results?.length}
                onPageChange={handlePageChange}
            />
            <MobilePagination 
                totalResults={searchResults?.total_results} 
                resultsPerPage={searchResults.results?.length} 
            onPageChange={handlePageChange} />
        </div>
    );
};

export default SearchResultsPage;
