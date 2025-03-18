import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular } from '../../features/movie-action/movieAction';
import { Link, useParams } from "react-router";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { setPage } from "../../features/movie-action/movieSlice";
import { empty, innerDate, Votes } from "../../utility";
import { Pagination } from "flowbite-react";
import { url } from "../../utility";

export default function PopularMovie() {
     const dispatch = useDispatch();
     const param = useParams();
     const { popular, page } = useSelector((state) => state.movie);
     const totalPages = popular?.total_pages || 1;
     useEffect(() => {
          document.title = 'Fox Movie - Popular Movie';
     }, []);

     useEffect(() => {
          dispatch(fetchPopular(page));
     }, [dispatch, page])

     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));  // Set new page using Redux
     };

     return (
          <div className="my-[120px]">

               <div className="flex gap-4 justify-between items-center w-full px-16 my-4">
                    <h1 className="text-base md:text-xl xl:text-2xl">Popular Movies</h1>
                    <Pagination
                         currentPage={page}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                         showIcons
                         className="mb-2 p-0"
                    />
               </div>

               <div>
                    <section className="grid grid-cols-6 gap-10 px-16">
                         {
                              popular?.results?.length > 0 ? (
                                   popular.results.map((item) => {
                                        const { id, poster_path, original_title, title, release_date, vote_average } = item;
                                        return (
                                             <Link key={id} to={`/movie-details/${id}-${original_title?.replace(/\s/g, "-")}`} className="cursor-pointer">
                                                  <MyPropsMovie
                                                       poster={poster_path ? url + poster_path : empty}
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