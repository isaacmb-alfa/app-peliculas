import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import SearchResultsPage from '../pages/SearchResultsPage';
import RelatedMoviesPage from '../pages/RelatedMoviesPage';
import { SearchProvider } from '../components/SearchContext';


function RoutesIndex() {

    return (
        <SearchProvider>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:nameMovie/:idMovie' element={<MovieDetails />} />
                <Route path='/related/:idMovie' element={<RelatedMoviesPage />} />
                <Route path='/search-results/:searchQuery' element={<SearchResultsPage />} />
            </Routes>
        </SearchProvider>
    )

}

export default RoutesIndex;