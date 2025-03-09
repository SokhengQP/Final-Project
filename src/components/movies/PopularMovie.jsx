import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular } from '../../features/movie-action/movieAction';
import { Link, useParams } from "react-router";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { setPage } from "../../features/movie-action/movieSlice";
import { innerDate, Votes } from "../../utility";
import { Pagination } from "flowbite-react"; // Optional if you want to match NowPlaying pagination style


const url = `https://image.tmdb.org/t/p/original`;

export default function PopularMovie() {
     const dispatch = useDispatch();
     const param = useParams();
     const { popular, page } = useSelector((state) => state.movie);
     const totalPages = popular?.total_pages || 1;


     useEffect(() => {   
          document.title = 'Fox Movie - Popular Movie';
          dispatch(fetchPopular(page));  // Fetch data whenever page changes
     }, [dispatch, page]);


     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));  // Set new page using Redux
     };

     return (
          <div className="my-[120px]">
               
               <div className="flex gap-4 justify-between items-center w-full px-10 my-4">
                    <h1 className="text-base md:text-xl xl:text-2xl">Popular Movies</h1>
                    <Pagination
                         currentPage={page}
                         totalPages={totalPages}
                         onPageChange={handlePageChange} // Same logic as NowPlaying
                         showIcons
                         className="mb-2 p-0"
                    />
               </div>

               <div>
                    <section className="grid grid-cols-5 gap-10 px-10">
                         {
                              popular?.results?.length > 0 ? (
                                   popular.results.map((item) => {
                                        const { id, poster_path, original_title, title, release_date, vote_average } = item;
                                        const movieLink = `/movie-details/${id}-${original_title?.replace(/\s/g, "-")}`;

                                        return (
                                             <Link key={id} to={movieLink} className="hover:scale-105 cursor-pointer">
                                                  <MyPropsMovie 
                                                       poster={url + poster_path} 
                                                       releaseDate={innerDate(release_date)}
                                                       votes={Votes(vote_average)}
                                                       originalTitle={title}
                                                  />
                                             </Link>
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
