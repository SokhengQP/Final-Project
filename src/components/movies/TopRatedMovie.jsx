import { useDispatch, useSelector } from "react-redux";
import { fetchMovieTopRate } from "../../features/movie-action/movieAction";
import { useEffect } from "react";
import { setPage } from '../../features/movie-action/movieSlice';
import { Link } from "react-router"; // Fix this
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Pagination } from "flowbite-react"; // Use flowbite pagination for consistency
import { Votes } from "../../utility";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { addToFavorites } from "../../features/favorite-action/favouriteSlice";


const url = `https://image.tmdb.org/t/p/original`;


export default function TopRatedMovie() {

     const dispatch = useDispatch();
     const { movieTopRate, page } = useSelector(state => state.movie);
     const { favorites } = useSelector(state => state.favorites);
     const totalPages = movieTopRate?.total_pages || 1;

     useEffect(() => {
          document.title = `Fox Movie - Top Rated`;
          dispatch(fetchMovieTopRate(page));  // Fetch data on page change
     }, [dispatch, page]);


     // Reset page to first page when switching component
     useEffect(() => {
          dispatch(setPage(1));
     }, [dispatch])

     
     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage)); // Just set page, useEffect will handle fetching
     };

     const handleAddToFavorites = (movie) => {
          setTimeout(() => {
               const movieItem = { ...movie, media_type: 'movie' };
               dispatch(addToFavorites(movieItem));
          }, 500);
     };
     const isFavorite = (movieId) => {
          return favorites.some(fav => fav.id === movieId);
     };

     return (
          <div className="my-[120px] px-16">

               <div className="flex flex-col 2xl:flex-row justify-between items-center w-full my-4">
                    <h1 className="text-base md:text-xl xl:text-2xl">Top Rated Movies</h1>
                    <Pagination
                         currentPage={page}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                         showIcons
                         className="mb-2 p-0"
                    />
               </div>


               <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
                    {
                         movieTopRate?.results?.length > 0 ? (
                              movieTopRate.results.map(item => {
                                   const { id, title, release_date, vote_average, poster_path, original_title } = item;
                                   const isFav = isFavorite(id);
                                   return (
                                        <div className="relative" key={id}>
                                             <Link to={`/movie-details/${id}-${original_title?.replace(/\s+/g, '-')}`} className=" cursor-pointer">
                                                  <MyPropsMovie
                                                       originalTitle={title || 'Unavailable'}
                                                       poster={url + poster_path}
                                                       votes={Votes(vote_average)}
                                                       releaseDate={release_date || 'Unavailable'}
                                                  />
                                             </Link>
                                             <button
                                                  className={`absolute right-4 top-2 mt-2 px-2 py-2 rounded-[50%] text-md ${isFav ? 'bg-black text-red-600 cursor-not-allowed' : 'bg-[#090109] text-white '}`}
                                                  onClick={() => handleAddToFavorites(item)}
                                                  disabled={isFav}
                                             >
                                                  {isFav ? <MdFavorite /> : <MdFavoriteBorder />}
                                             </button>
                                        </div>
                                   )
                              })
                         ) : (
                              <p className="col-span-5 text-center text-lg text-gray-400">No top-rated movies found.</p>
                         )
                    }
               </section>
          </div>
     );
}
