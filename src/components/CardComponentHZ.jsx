import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import imageDefault from "../assets/default.png";

const CardComponentHZ = ({ movie }) => { // Recibe la prop movie
    const navigate = useNavigate();

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .replace(/\s+/g, '-');

    const posterPathImageUrl = movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : imageDefault;
    const descriptionCard = movie?.overview ? movie.overview.split(' ').slice(0, 20).join(' ') + "..." : "Sin descripción.";
    const linkFrendly = movie?.title ? slugify(movie.title) : "no-title";

    const toTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="w-full px-4 mb-4">
            <div className="flex border border-gray-900 rounded p-4 shadow-xl">
                <img
                    src={posterPathImageUrl}
                    alt={"foto de " + movie?.title}
                    className="w-48 h-auto mr-4 object-cover"
                />
                <div className="flex-grow">
                    <h2 className="text-lg font-bold">{movie?.title}</h2>
                    <p className="text-sm text-gray-400 line-clamp-2">{descriptionCard}</p>
                    <NavLink onClick={toTop}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2"
                        to={`/${linkFrendly}/${movie?.id}`}
                    >
                        Leer mas..
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default CardComponentHZ;