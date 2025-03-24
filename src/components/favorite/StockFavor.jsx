import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../features/favorite-action/favouriteSlice';
import { faces, fallbackImg } from '../../utility';
import { Link } from 'react-router';
import { CiBookmarkRemove } from "react-icons/ci";
import { IoTv } from "react-icons/io5";

export default function StockFavor() {
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.favorites);
    const [query, setQuery] = useState('');
    const [mediaType, setMediaType] = useState('all'); 

    const handleRemoveFromFavorites = (movieId) => {
        dispatch(removeFromFavorites(movieId));
    };

    const filteredFavorites = favorites?.filter((movie) => {
        const title = movie.title || '';
        const name = movie.name || '';
        const matchesQuery = title.toLowerCase().includes(query.toLowerCase()) ||
            name.toLowerCase().includes(query.toLowerCase());

        if (mediaType === 'all') return matchesQuery;
        return matchesQuery && movie.media_type === mediaType;
    }) || [];

    const handleFilter = (type) => {
        setMediaType(type);
    };

    return (
        <>
            <h2 className="mt-[120px] text-center 2xl:text-2xl">Search Favorite Movie or TV shows...</h2>
            <form
                className="flex items-center max-w-lg mx-auto mb-4 z-10 my-2"
                onSubmit={(e) => e.preventDefault()}
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
                        className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search your favorites..."
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    Search
                </button>
            </form>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => handleFilter('all')}
                    className={`px-4 py-2 rounded-lg ${mediaType === 'all' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white transition-colors`}
                >
                    All
                </button>
                <button
                    onClick={() => handleFilter('movie')}
                    className={`px-4 py-2 rounded-lg ${mediaType === 'movie' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white transition-colors`}
                >
                    Movies
                </button>
                <button
                    onClick={() => handleFilter('tv')}
                    className={`px-4 py-2 rounded-lg ${mediaType === 'tv' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white transition-colors`}
                >
                    TV Shows
                </button>
            </div>

            <section className='flex flex-wrap gap-4 justify-center'>
                <div className="flex flex-col">
                    <p className='text-xl font-[700] my-1 px-4'>{mediaType === 'all' ? 'Favorites' : mediaType === 'movie' ? 'Movies' : 'TV Shows'}</p>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 transition-all px-4 ease-in-out gap-6 duration-500'>
                        {filteredFavorites.length === 0 ? (
                            <p className="text-xl">
                                {query ? "No matching favorites found" : 'No Favorites yet'}
                            </p>
                        ) : (
                            filteredFavorites?.map((movie) => {
                                const { poster_path, name, id, title, overview, media_type } = movie;
                                return (
                                    <div
                                        key={id}
                                        className="relative flex items-center gap-4 p-4 bg-[rgba(27,27,27,0.86)] dark:bg-[#ffffffdf] dark:text-black text-white rounded-3xl opacity-100 transition-opacity duration-500 ease-in-out"
                                    >
                                        <img
                                            className="rounded-md object-contain w-[100px] sm:w-[140px]"
                                            src={poster_path ? faces + poster_path : fallbackImg}
                                            alt={title || name}
                                        />
                                        <div className="flex flex-col gap-4">
                                            <p className="text-xl font-[800] line-clamp-2">{title || name}</p>
                                            <p className="text-sm text-gray-500">
                                                {overview?.length > 75 ? overview.substring(0, 75) + '...' : overview}
                                            </p>
                                            <aside className="flex items-center justify-center gap-4 text-center">
                                                <Link
                                                    to={`/profile/${id}`}
                                                    className="border-2 text-sm py-1 rounded-3xl w-full border-white dark:border-[#2A2A2A] dark:text-black"
                                                >
                                                    Profile
                                                </Link>
                                                <Link
                                                    to={media_type === 'tv' ? `/tv-details/${id}` : `/movie-details/${id}`}
                                                    className="bg-white text-sm dark:bg-black text-black dark:text-white px-4 py-1 rounded-3xl w-full"
                                                >
                                                    Details
                                                </Link>
                                            </aside>
                                        </div>
                                        <button
                                            className="absolute top-3 right-6 rounded-[12px] hover:rounded-[50%] flex items-center justify-center w-8 h-8 custom-drop-shadow border-2 border-transparent border-white dark:border-black"
                                            onClick={() => handleRemoveFromFavorites(id)}
                                        >
                                            <CiBookmarkRemove className="text-current w-[20px]" />
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}