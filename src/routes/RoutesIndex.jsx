import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import SearchResultsPage from '../pages/SearchResultsPage';
import { SearchProvider } from '../components/SearchContext';


function RoutesIndex() {

    return (
        <SearchProvider>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:nameMovie/:idMovie' element={<MovieDetails />} />
                <Route path='/search-results' element={<SearchResultsPage />} />
            </Routes>
        </SearchProvider>
    )

}

export default RoutesIndex;