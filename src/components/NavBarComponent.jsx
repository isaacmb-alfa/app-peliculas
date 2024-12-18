import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from './SearchContext';
import logo from '../assets/logo-1.svg';

// Helper function to debounce the search requests

function NavBarComponent({ onSelectChange }) {
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
    const { setSearchResults } = useContext(SearchContext);
    const navigate = useNavigate();
    

    const hiddenToggleNav = () => {
        const navbar = document.getElementById('navbar-search');
        navbar.classList.toggle("hidden")
    }

    const handleSelectChange = (event) => {
        onSelectChange(event.target.value);
    };
    // Function to fetch search results
    const fetchSearchResults = async (query) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=es-MX&page=1`;
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
            localStorage.setItem('searchResults', JSON.stringify(data));
            setSearchResults(data); 
            navigate('/search-results');
        } catch (error) {
            console.error('Error fetching search results:', error);
        }

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('searchTerm', searchTerm);
        fetchSearchResults(searchTerm);
    };

    useEffect(() => {
        const inputSearch = document.getElementById('search-navbar');
        const hiddenElement = document.getElementById('searchMenu');

        inputSearch.addEventListener('input', () => {
            if (inputSearch.value.trim() !== '') {
                hiddenElement.classList.remove('hidden');
            } else {
                hiddenElement.classList.add('hidden');
            }
        });
    }, []);

    const changeSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <nav className="bg-white border-b-2 border-gray-800  dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-6" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pelis</span>
                    </a>
                    <div className="flex md:order-2">
                        <button onClick={() => { hiddenToggleNav() }} type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            {/* Formulario de búsqueda en dispositivos de escritorio */}
                            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center">
                                <input onChange={changeSearch} type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." value={searchTerm} />
                                {/* Botón de búsqueda ajustado para dispositivos móviles */}
                                <button type="submit" className="block w-full mt-2 p-2 bg-blue-500 text-white rounded-lg md:hidden">Search</button>
                            </form>
                        </div>
                        <button onClick={() => { hiddenToggleNav() }} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                        <div className="relative mt-3 md:hidden">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 top-3 absolute" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center">
                                <input onChange={changeSearch} type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." value={searchTerm} />
                                {/* Botón de búsqueda ajustado para dispositivos móviles */}
                                <button type="submit" className="block w-full mt-2 p-2 bg-blue-500 text-white rounded-lg md:hidden">Search</button>
                            </form>
                        </div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Inicio</a>
                            </li>
                            <li>

                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sobre el Proyecto</a>
                            </li>
                        </ul>
                        {/* Ajustar la posición del select para dispositivos móviles */}
                        <select onChange={handleSelectChange} id="lenguage" className="md:block md:w-auto w-full p-2 rounded-md bg-transparent dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 border dark:text-white text-gray-900 mt-2 md:mt-0 md:ms-3" name="select">
                            <option value="es-MX">Español</option>
                            <option value="en-US">English</option>
                        </select>
                    </div>
                </div>
            </nav>
            <div className="w-full bg-gray-900 flex justify-center hidden" id='searchMenu'>
                <div className="min-h-20  container flex justify-center content-center ">
                    <p className="text-5xl font-bold text-slate-300">{searchTerm}</p>
                </div>
            </div>
        </>
    );

}

export default NavBarComponent