import { useDispatch, useSelector } from "react-redux";
import { fetchMovieTopRate } from "../../features/movie-action/movieAction";
import { useEffect } from "react";
import { setPage } from '../../features/movie-action/movieSlice';
import { Link } from "react-router"; // Fix this
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Pagination } from "flowbite-react"; // Use flowbite pagination for consistency
import { Votes } from "../../utility";


const url = `https://image.tmdb.org/t/p/original`;


export default function TopRatedMovie() {

     const dispatch = useDispatch();
     const { movieTopRate, page } = useSelector(state => state.movie);
     const totalPages = movieTopRate?.total_pages || 1;

     useEffect(() => {
          document.title = `Fox Movie - Top Rated`;
          dispatch(fetchMovieTopRate(page));  // Fetch data on page change
     }, [dispatch, page]);

     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage)); // Just set page, useEffect will handle fetching
     };

     return (
          <div className="my-[120px]">
               
               <div className="flex gap-4 justify-between items-center w-full px-16 my-4">
                    <h1 className="text-base md:text-xl xl:text-2xl">Top Rated Movies</h1>
                    <Pagination
                         currentPage={page}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                         showIcons
                         className="mb-2 p-0"
                    />
               </div>


               <section className="grid grid-cols-6 gap-10 px-16">
                    {
                         movieTopRate?.results?.length > 0 ? (
                              movieTopRate.results.map(item => {
                                   const { id, title, release_date, vote_average, poster_path, original_title } = item;
                                   const movieLink = `/movie-details/${id}-${original_title?.replace(/\s+/g, '-')}`;

                                   return (
                                        <Link to={movieLink} key={id} className=" cursor-pointer">
                                             <MyPropsMovie
                                                  originalTitle={title || 'Unavailable'}
                                                  poster={url + poster_path}
                                                  votes={Votes(vote_average)}
                                                  releaseDate={release_date || 'Unavailable'}
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
     );
}
