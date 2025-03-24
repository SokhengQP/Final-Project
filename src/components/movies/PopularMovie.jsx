import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular } from '../../features/movie-action/movieAction';
import { Link } from "react-router";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { setPage } from "../../features/movie-action/movieSlice";
import { faces, fallbackImg, innerDate, Votes } from "../../utility";
import { Pagination } from "flowbite-react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { addToFavorites } from "../../features/favorite-action/favouriteSlice";

export default function PopularMovie() {
     const dispatch = useDispatch();
     const { popular, page } = useSelector((state) => state.movie);
     const { favorites } = useSelector(state => state.favorites);

     const totalPages = popular?.total_pages || 1;
     useEffect(() => {
          document.title = 'Fox Movie - Popular Movie';
     }, []);

     useEffect(() => {
          dispatch(fetchPopular(page));
     }, [dispatch, page])
     
     // Reset page to first page when switching component
     useEffect(() => {
          dispatch(setPage(1));
     }, [dispatch])


     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));  // Set new page using Redux
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

               <div className="flex flex-col 2xl:flex-row justify-between items-center w-full my-4 ">
                    <h1 className="text-base md:text-xl xl:text-2xl">Popular Movie</h1>
                    <Pagination
                         currentPage={page}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                         showIcons
                         className="mb-2 p-0"
                    />
               </div>

               <div>
                    <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
                         {
                              popular?.results?.length > 0 ? (
                                   popular.results.map((item) => {
                                        const { id, poster_path, original_title, title, release_date, vote_average } = item;
                                        const isFav = isFavorite(id);
                                        return (
                                             <div key={id} className="relative">
                                                  <Link to={`/movie-details/${id}-${original_title?.replace(/\s/g, "-")}`} className="cursor-pointer">
                                                       <MyPropsMovie
                                                            poster={poster_path ? faces + poster_path : fallbackImg}
                                                            releaseDate={innerDate(release_date)}
                                                            votes={Votes(vote_average)}
                                                            originalTitle={title}
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
                                   <p className="text-center w-full col-span-5 text-lg text-gray-300">No popular movies found.</p>
                              )
                         }
                    </section>
               </div>
          </div>
     );
}