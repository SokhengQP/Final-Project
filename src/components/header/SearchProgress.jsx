import { faces, faces_original, fallbackImg } from "../../utility.js";
import { MyPropsMovie } from "../../props/MyPropsMovie.jsx";
import { Link } from "react-router";
import { Votes } from "../../utility.js";
import { fetchDiscover } from "../../features/movie-action/movieAction.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from '../../features/search/fetchSearchResults.js';
import { addToFavorites } from '../../features/favorite-action/favouriteSlice.js'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { IoTv } from "react-icons/io5";

export default function SearchProgress() {
    const dispatch = useDispatch();
    const { results, loading, error } = useSelector((state) => state.search);
    const { favorites } = useSelector(state => state.favorites);
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(fetchDiscover());
    }, [dispatch]);

    const handleSearch = () => {
        if (query.trim()) {
            dispatch(fetchSearchResults(query));
        }
    };

    const handleAddToFavorites = (movie) => {
        dispatch(addToFavorites(movie));
    };

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.id === movieId);
    };

    return (
        <>
            <div className="mt-[120px] px-16">
                <div className="2xl:text-2xl text-center my-2">Search Movie and TV shows ...</div>

                <form
                    className="flex items-center max-w-lg mx-auto"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <IoTv />
                        </div>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            id="voice-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for movies or TV series..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        Search
                    </button>
                </form>
            </div>
            <section className="px-16">
                {query && (
                    <div>
                        <h3 className="text-xl font-semibold py-4">Search Results</h3>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">Something went wrong: {error.message}</p>
                        ) : results.length === 0 ? (
                            <p>No results found</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 transition-all ease-in-out gap-6 duration-500">
                                {results.map(item => {
                                    let { id, poster_path, original_title, release_date, media_type, first_air_date, name, vote_average } = item;
                                    const isFav = isFavorite(id);
                                    return (
                                        <div key={id} className="relative">
                                            <Link to={media_type === 'movie' ? `/movie-details/${id}` : `/tv-details/${id}`}>
                                                <MyPropsMovie
                                                    poster={poster_path ? faces_original + poster_path : fallbackImg}
                                                    originalTitle={original_title || name}
                                                    votes={vote_average ? Votes(vote_average) : 0}
                                                    releaseDate={release_date || first_air_date}
                                                />
                                            </Link>
                                            <button
                                                className={`absolute right-4 top-2 mt-2 px-2 py-2 rounded-[50%] text-md ${isFav ? 'bg-black text-red-600 cursor-not-allowed' : 'bg-[#090109] text-white'}`}
                                                onClick={() => handleAddToFavorites(item)}
                                                disabled={isFav}
                                            >
                                                {isFav ? <MdFavorite /> : <MdFavoriteBorder />}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    );
}