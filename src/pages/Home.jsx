import { useEffect, useState } from 'react';

import NavBarComponent from '../components/NavBarComponent';
import MovieCardComponent from '../components/MovieCardComponent';
import SliderComponent from '../components/SliderComponent';
import PaginationComponent from '../components/PaginationComponent';
import FooterComponent from '../components/FooterComponent';

function Home() {
    const [movieList, setMovieList] = useState([]);
    const [totalPagination, setTotalPagination] = useState({});
    const [isRequestDone, setIsRequestDone] = useState(false);
    const [lenguage, setLenguage] = useState('es-MX');
    const [currentPage, setCurrentPage] = useState(1);
    /* revisar funcionamiento */
    const [searchResults, setSearchResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setTotalResults(results.total_results);
        console.log('Search Results:', results);
    };

    const fetchMovies = async (page) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=${lenguage}&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovieList(data.results);
            setTotalPagination(data);
        } catch (error) {
            console.log('An error occurred');
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovies(currentPage); // Llama fetchMovies al montar el componente y cuando cambian lenguage o currentPage 
    }, [lenguage, currentPage]);

    const handleSelectChange = (value) => {
        setLenguage(value);
    }
    const handlePageChange = (page) => {
        setCurrentPage(page); // Actualiza la página actual 
    };

    return (
        <>
            <NavBarComponent onSelectChange={handleSelectChange} handleSearchResults={handleSearchResults} />
            <div className='container flex justify-center flex-wrap mx-auto'>
                <SliderComponent movies={movieList} handleSelectChange={lenguage} />
            </div>
            <div className='container flex justify-center p-5 gap-4 flex-wrap mx-auto'>

                {movieList?.map((movie, index) =>
                    <MovieCardComponent key={index} name={movie.title} image={movie.backdrop_path} description={movie.overview} id={movie.id} />
                )}
                {console.log(totalPagination)}
            </div>
            <PaginationComponent totalResults={totalPagination?.total_results} resultsPerPage={totalPagination.results?.length} onPageChange={handlePageChange} />
            <FooterComponent />
        </>
    )
}

export default Home