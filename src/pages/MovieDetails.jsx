import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams  } from 'react-router-dom';
import NavBarComponent from '../components/NavBarComponent';
import FooterComponent from './../components/FooterComponent';
import CardComponentHZ from '../components/CardComponentHZ';

function MovieDetails() {
    const { idMovie, nameMovie } = useParams({});
    const [movie, setMovie] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [lenguage, setLenguage] = useState('es-MX');
    const navBarInputRef = useRef(null); // Reference for NavBar input
    const navigate = useNavigate();
    const [currentSearchTerm, setCurrentSearchTerm] = useState('');

    console.log(idMovie, nameMovie);

    useEffect(() => {
        // Remove any potential event listeners on the document
        const removeDocumentListeners = () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('submit', handleSubmit);
        };

        removeDocumentListeners();

        // Optional: Set focus on NavBar input after mount
        if (navBarInputRef.current) {
            navBarInputRef.current.focus();
        }

        return removeDocumentListeners;
    }, []);
    const handleKeyDown = (event) => {
        // Your keydown handler logic (if needed)
    };

    const handleSubmit = (event) => {
        // Your submit handler logic (if needed)
    };



    useEffect(() => {
        // Fetch movie details
        const fetchMovieDetails = async () => {
            const url = `https://api.themoviedb.org/3/movie/${idMovie}?language=${lenguage}`;
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
                console.log(data);
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        // Fetch related movies
        const fetchRelatedMovies = async (idmovie) => {
            const url = `https://api.themoviedb.org/3/movie/${idmovie}/similar?language=${lenguage}&page=1`;
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


                setRelatedMovies(data.results);
            } catch (error) {
                console.error('Error fetching related movies:', error);
            }
        };

        fetchMovieDetails();
        fetchRelatedMovies(idMovie);
    }, [idMovie, lenguage]);

    const handleSelectChange = (value) => {
        setLenguage(value);
    }
    const handleSearch = useCallback((searchTerm) => {
        setCurrentSearchTerm(searchTerm);
        if (searchTerm.trim() !== '') {
            navigate(`/search-results/${searchTerm}`);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .replace(/\s+/g, '-');

    const linkFrendly = movie?.title ? slugify(movie?.title) : "no-title";


    return (
        <>
            <NavBarComponent
                onSelectChange={handleSelectChange}
                currentSearchTerm={currentSearchTerm}
                onSearch={handleSearch} // Pasa la función handleSearch
            />
            <div className='container min-h-screen grid justify-center align-center min-w-full md:min-w-[1200px] mx-auto'>
                <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row">
                    {movie ? (
                        <div className="flex-grow p-4">
                            {/* Imagen de la película */}
                            <img src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`} alt={movie.title} className="w-full h-96 object-cover mb-4 rounded" />

                            {/* Datos de la película */}
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                                <p className="mb-4">{movie.overview}</p>

                                {/* Calificación con animación */}
                                <div className="mb-4">
                                    <label className="text-sm font-medium">Calificación:</label>
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-300">
                                            <div style={{ width: `${movie.vote_average * 10}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500">
                                                {movie.vote_average}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <strong>Géneros:</strong>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {movie?.genres.map((genre) => (
                                            <button key={genre.id} className="bg-blue-500 text-white px-2 py-1 rounded">
                                                {genre.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <ul className="space-y-2">
                                    <li><strong>Votos:</strong> {movie.vote_count}</li>
                                    <li><strong>Última Actualización:</strong> {new Date(movie.release_date).toLocaleDateString()}</li>
                                    <li><strong>Idioma Original:</strong> {movie.original_language}</li>
                                    <li><strong>País:</strong> {movie.production_countries.map(country => country.name).join(', ')}</li>
                                    <li><strong>Presupuesto:</strong> ${movie.budget.toLocaleString()}</li>
                                </ul>

                            </div>
                        </div>
                    ) : 'Loading...'}

                    {/* Barra lateral de películas relacionadas */}
                    <div className="lg:w-1/3 p-4 bg-gray-800 flex-shrink-0">
                        <h2 className="text-2xl font-bold mb-4">Películas Relacionadas</h2>
                        <div className="flex flex-wrap justify-start"> {/*Contenedor para las cards*/}
                            {relatedMovies?.slice(0, 10).map((movie, index) => ( //slice para solo mostrar 10 elementos
                                <div key={index} className="w-full md:w-1/2 lg:w-full p-2"> {/* Elemento contenedor */}
                                    <CardComponentHZ key={index} movie={movie} /> {/* Pasa el objeto movie*/}
                                </div>
                            ))}
                        </div>
                        {relatedMovies?.length > 10 && ( // Muestra el botón solo si hay más de 10 películas
                            <Link to={`/related/${idMovie}?title=${linkFrendly}&page=${1}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-full text-center inline-block">
                                Ver más películas similares
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    )
}

export default MovieDetails;