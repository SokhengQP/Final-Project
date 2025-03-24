import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomming } from "../../features/movie-action/movieAction";
import { setPage } from '../../features/movie-action/movieSlice';
import { Link } from "react-router";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Votes } from "../../utility";
import { Pagination } from "flowbite-react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { addToFavorites } from "../../features/favorite-action/favouriteSlice";

const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;

export default function Upcomming() {
     const { upcomming, page } = useSelector(state => state.movie);
     const { favorites } = useSelector(state => state.favorites);
     const dispatch = useDispatch();
     let totalPages = upcomming?.total_pages || 1;

     useEffect(() => {
          document.title = `Fox Movie - Upcomming`;
          dispatch(fetchUpcomming(page));
     }, [dispatch, page]);


     // Reset page to first page when switching component
     useEffect(() => {
          dispatch(setPage(1));
     }, [dispatch]);


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
          <>

               <div className="my-[120px] px-16">
                    <div className="flex flex-col 2xl:flex-row justify-between items-center w-full my-4">
                         <h1 className="text-base md:text-xl xl:text-2xl">Upcomming Movies</h1>
                         <Pagination
                              currentPage={page}
                              totalPages={totalPages}
                              onPageChange={handlePageChange} // Same style as NowPlaying
                              showIcons
                              className="mb-2 p-0"
                         />
                    </div>

                    <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
                         {
                              upcomming?.results?.length > 0 ? (
                                   upcomming.results.map(item => {
                                        const { id, title, release_date, vote_average, poster_path, original_title } = item;
                                        const isFav = isFavorite(id);
                                        return (
                                             <div className="relative" key={id}>
                                                  <Link to={`/movie-details/${id}-${original_title?.replace(/\s+/g, '-')}`} className=" cursor-pointer">
                                                       <MyPropsMovie
                                                            originalTitle={title || 'N/A'}
                                                            poster={poster_path ? url + poster_path : empty}
                                                            votes={Votes(vote_average) || "0"}
                                                            releaseDate={release_date || '0h 00m'}
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


          </>
     )
};
