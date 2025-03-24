import { useDispatch, useSelector } from "react-redux"
import { fetchPopularTv } from "../../features/tv-actions/tvAction";
import { useEffect } from "react";
import { Link } from "react-router";
import { Pagination } from "flowbite-react";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Votes } from "../../utility";
import { setPage } from '../../features/tv-actions/tvSlice';
import { faces, fallbackImg } from '../../utility'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { addToFavorites } from "../../features/favorite-action/favouriteSlice";

export default function PopularTv() {
     const dispatch = useDispatch();
     let { popularTv, page } = useSelector((state) => state.myTvs);
     const { favorites } = useSelector(state => state.favorites);
     const totalPage = popularTv?.total_pages || 1;

     useEffect(() => {
          dispatch(fetchPopularTv(page));
     }, [dispatch, page])

     useEffect(() => {
          dispatch(setPage(1));
     }, [dispatch])
     
     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));
     };

     const handleAddToFavorites = (movie) => {
          const movieItem = { ...movie, media_type: 'tv' };
          setTimeout(() => {
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
                         <h2 className="text-base md:text-xl xl:text-2xl">Popular TV Shows</h2>
                         <Pagination
                              currentPage={page}
                              totalPages={totalPage ?? 1}
                              onPageChange={handlePageChange}
                              showIcons
                              className="mb-2 p-0"
                         />
                    </div>

                    <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
                         {
                              popularTv?.results?.length > 0 ? (
                                   popularTv?.results?.map(item => {
                                        const { id, name, first_air_date, poster_path, vote_average, original_name } = item;
                                        const isFav = isFavorite(id);
                                        return (
                                             <div key={id} className="relative">
                                                  <Link to={`/tv-details/${id}-${original_name?.replace(/\s+/g, '-')}`} className="cursor-pointer gap-10">
                                                       <MyPropsMovie
                                                            originalTitle={name || 'Unavailable'}
                                                            poster={poster_path ? (faces + poster_path) : (fallbackImg)}
                                                            votes={Votes(vote_average)}
                                                            releaseDate={first_air_date || 'Unavailable'}
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
          </>
     )
}