import React, { useState, useEffect, useContext } from 'react';
import MovieCardComponent from '../components/MovieCardComponent';
import NavBarComponent from '../components/NavBarComponent';
import PaginationComponent from '../components/PaginationComponent';
import { SearchContext } from '../components/SearchContext';

const SearchResultsPage = () => {
    const { searchResults, setSearchResults } = useContext(SearchContext);
    const [localSearchResults, setLocalSearchResults] = useState(searchResults);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTermInput, setSearchTermInput] = useState('');

    // Función para manejar los resultados de búsqueda nuevos
    const handleSearchResults = (results) => {
        setSearchResults(results);
        setLocalSearchResults(results);
        setSearchTermInput(localStorage.getItem('searchTerm') || '');
        setCurrentPage(1); // Resetea a la primera página
        console.log(results);
    };

    // useEffect para cargar los resultados guardados en localStorage al montar el componente
    useEffect(() => {
        const savedResults = localStorage.getItem('searchResults');
        if (savedResults) {
            const parsedResults = JSON.parse(savedResults);
            setSearchResults(parsedResults);
            setLocalSearchResults(parsedResults);
        }
        const searchTerm = localStorage.getItem('searchTerm');
        if (searchTerm) {
            setSearchTermInput(searchTerm);
        }
    }, [setSearchResults]);

    // Función para manejar cambios de página
    const handlePageChange = async (page) => {
        const searchTerm = localStorage.getItem('searchTerm');
        if (searchTerm) {
            const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=es-MX&page=${page}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: import.meta.env.VITE_TOKEN_API
                }
            };
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setSearchResults(data);
                setLocalSearchResults(data);
                setCurrentPage(page); // Actualiza la página actual
                localStorage.setItem('searchResults', JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    };

    // useEffect para manejar el término de búsqueda al cambiar los resultados locales
    useEffect(() => {
        const searchTerm = localStorage.getItem('searchTerm');
        if (searchTerm) {
            setSearchTermInput(searchTerm);
        }
    }, [ searchResults]);
    console.log(searchResults);
    

    return (
        <div className="min-h-screen" style={{ background: 'rgb(10, 23, 40)' }}>
            {/* Barra de Navegación */}
            <NavBarComponent handleSearchResults={handleSearchResults} />

            {/* Contenedor de Resultados */}
            <h1 className='text-4xl text-gray-100 text-center font-bold my-3'>
                Resultados de la búsqueda <span className='capitalize text-gray-400 underline'>{searchTermInput}</span>
            </h1>
            <div className="container flex justify-center p-5 gap-4 flex-wrap mx-auto">
                {searchResults.results?.length > 0 ? (
                    <div className="flex flex-wrap mx-auto gap-4 justify-center">
                        {searchResults.results.map((movie, index) => (
                            <MovieCardComponent key={index} name={movie.title} image={movie.backdrop_path} description={movie.overview} id={movie.id} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-8 text-gray-100 text-3xl">
                        No se encontraron resultados.
                    </div>
                )}
            </div>
            <PaginationComponent
                totalResults={localSearchResults?.total_results}
                resultsPerPage={localSearchResults.results?.length} 
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default SearchResultsPage;
