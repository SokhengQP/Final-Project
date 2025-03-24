import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingPage } from "../../features/movie-action/movieAction";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Link } from "react-router";
import { setPage } from '../../features/movie-action/movieSlice';
import { Votes } from "../../utility";
import { Pagination } from "flowbite-react";
import { faces, fallbackImg } from '../../utility'
import { addToFavorites } from "../../features/favorite-action/favouriteSlice";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

export default function NowPlaying() {

     const dispatch = useDispatch();
     const { movieplayingPage, page } = useSelector((state) => state.movie);
     const { favorites } = useSelector(state => state.favorites);
     const totalPage = movieplayingPage?.total_pages || 1;

     useEffect(() => {
          document.title = `Fox Movie - Now Playing`;
          dispatch(fetchNowPlayingPage(page));
     }, [dispatch, page]); // Now depends on page, so data reloads correctly


     // Reset page to first page when switching component
     useEffect(() => {
          dispatch(setPage(1));
     }, [dispatch])

     
     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));  // Properly set page via dispatch
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
          <div className="my-[120px] px-8 md:px-16">
               <div className="flex flex-col 2xl:flex-row justify-between items-center my-4">
                    <h2 className="text-2xl md:text-2xl xl:text-3xl">Now Playing Movies</h2>
                    <Pagination
                         currentPage={page}
                         totalPages={totalPage}
                         onPageChange={handlePageChange}
                         showIcons
                         className="mb-2 p-0"
                    />
               </div>

               <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
                    {
                         movieplayingPage?.results?.length > 0 ? (
                              movieplayingPage.results?.map(item => {
                                   const { id, title, release_date, poster_path, vote_average, original_title } = item;
                                   const isFav = isFavorite(id);
                                   return (
                                        <div key={id} className="relative">
                                             <Link to={`/movie-details/${id}-${original_title?.replace(/\s+/g, '-')}`} >
                                                  <MyPropsMovie
                                                       originalTitle={title || 'Unavailable'}
                                                       poster={poster_path ? faces + poster_path : fallbackImg}
                                                       votes={Votes(vote_average) || 0}
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
                                   );
                              })
                         ) : (
                              <p>No movies found.</p>
                         )
                    }
               </section>
          </div>
     );
}
