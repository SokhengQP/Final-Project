import { useDispatch, useSelector } from "react-redux";
import { fetchAiringTv } from "../../features/tv-actions/tvAction";
import { useEffect } from "react";
import { Link } from "react-router";
import { Pagination } from "flowbite-react";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Votes } from "../../utility";
import { setPage } from '../../features/tv-actions/tvSlice';
import { faces, fallbackImg } from '../../utility';
import { addToFavorites } from "../../features/favorite-action/favouriteSlice";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

export default function OnTv() {
     const dispatch = useDispatch();
     let { airTv, page } = useSelector((state) => state.myTvs);
     const { favorites } = useSelector(state => state.favorites);
     const totalPage = airTv?.total_pages || 1;

     useEffect(() => {
          dispatch(fetchAiringTv(page));
     }, [dispatch, page]);
     
     // Reset page to first page when switching component
     useEffect(() => {
          dispatch(setPage(1));
     }, [dispatch])

     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));
     };
     

     const handleAddToFavorites = (movie) => {
          setTimeout(() => {
               const tvItem = { ...movie, media_type: 'tv' };
               dispatch(addToFavorites(tvItem));
               console.log('Added TV item:', tvItem);
          }, 500)
     };

     const isFavorite = (movieId) => {
          return favorites.some(fav => fav.id === movieId);
     };


     return (
          <>
               <div className="my-[120px] px-16">
                    <div className="flex flex-col 2xl:flex-row justify-between items-center w-full my-4">
                         <h2 className="text-base md:text-xl xl:text-2xl">TV Shows Airing Today</h2>
                         <Pagination
                              currentPage={page}
                              totalPages={totalPage ?? 1}
                              onPageChange={handlePageChange}
                              showIcons
                              className="mb-2 p-0"
                         />
                    </div>

                    <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
                         {airTv?.results?.length > 0 ? (
                              airTv?.results?.map(item => {
                                   const { id, name, first_air_date, poster_path, vote_average } = item;
                                   const isFav = isFavorite(id);
                                   return (
                                        <div className="relative" key={id}>
                                             <Link to={`/tv-details/${id}`} className="cursor-pointer gap-10">
                                                  <MyPropsMovie
                                                       originalTitle={name || 'Unavailable'}
                                                       poster={poster_path ? (faces + poster_path) : (fallbackImg)}
                                                       votes={Votes(vote_average)}
                                                       releaseDate={first_air_date || 'Unavailable'}
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
                              })
                         ) : (
                              <p>No movies found.</p>
                         )}
                    </section>
               </div>
          </>
     );
}