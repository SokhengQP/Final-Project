import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomming } from "../../features/movie-action/movieAction";
import { setPage } from '../../features/movie-action/movieSlice';
import { Link } from "react-router";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Votes } from "../../utility";
import { Pagination } from "flowbite-react";

const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;

export default function Upcomming() {
     const [] = useState();
     const { upcomming, page } = useSelector(state => state.movie);
     const dispatch = useDispatch();
     let totalPages = upcomming?.total_pages || 1;

     useEffect(() => {
          document.title = `Fox Movie - Upcomming`;
          dispatch(fetchUpcomming(page));
     }, [dispatch, page]);

     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage)); // Just set page, useEffect will handle fetching
     };


     return (
          <>

               <div className="my-[120px]">
                    <div className="flex gap-4 justify-between items-center w-full px-10 my-4">
                    <h1 className="text-base md:text-xl xl:text-2xl">Upcomming Movies</h1>
                         <Pagination
                              currentPage={page}
                              totalPages={totalPages}
                              onPageChange={handlePageChange} // Same style as NowPlaying
                              showIcons
                              className="mb-2 p-0"
                         />
                    </div>


                    <section className="grid grid-cols-5 gap-10 px-10">
                         {
                              upcomming?.results?.length > 0 ? (
                                   upcomming.results.map(item => {

                                        const { id, title, release_date, vote_average, poster_path, original_title } = item;
                                        const movieLink = `/movie-details/${id}-${original_title?.replace(/\s+/g, '-')}`;

                                        return (
                                             <Link to={movieLink} key={id} className="hover:scale-105 cursor-pointer">
                                                  <MyPropsMovie
                                                       originalTitle={title || 'N/A'}
                                                       poster={poster_path ? url + poster_path : empty}
                                                       votes={Votes(vote_average) || "0"}
                                                       releaseDate={release_date || '0h 00m'}
                                                  />
                                             </Link>
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
