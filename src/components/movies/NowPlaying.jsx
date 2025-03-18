import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingPage } from "../../features/movie-action/movieAction";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Link } from "react-router";
import { setPage } from '../../features/movie-action/movieSlice';
import { Votes } from "../../utility";
import { Pagination } from "flowbite-react";

const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;

export default function NowPlaying() {
     
     const dispatch = useDispatch();
     const { movieplayingPage, page } = useSelector((state) => state.movie);
     const totalPage = movieplayingPage?.total_pages || 1;

     useEffect(() => {
          document.title = `Fox Movie - Now Playing`;
          dispatch(fetchNowPlayingPage(page));
     }, [dispatch, page]); // Now depends on page, so data reloads correctly

     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));  // Properly set page via dispatch
     };

     return (
          <div className="my-[120px]">
               
               <div className="flex justify-between items-center my-4 px-8">
                    <h2 className="text-base md:text-xl xl:text-2xl">Now Playing Movies</h2>
                    <Pagination
                         currentPage={page}
                         totalPages={totalPage}
                         onPageChange={handlePageChange}
                         showIcons
                         className="mb-2 p-0"
                    />
               </div>

               <section className="grid 2xl:grid-cols-6 gap-10 px-16">
                    {
                         movieplayingPage?.results?.length > 0 ? (
                              movieplayingPage.results.map(item => {
                                   const { id, title, release_date, poster_path, vote_average, original_title } = item;
                                   return (
                                        <Link to={`/movie-details/${id}-${original_title?.replace(/\s+/g, '-')}`} key={id} className="cursor-pointer gap-10">
                                             <MyPropsMovie
                                                  originalTitle={title || 'Unavailable'}
                                                  poster={poster_path ? (url + poster_path) : (empty)}
                                                  votes={Votes(vote_average) || 0}
                                                  releaseDate={release_date || 'Unavailable'}
                                             />
                                        </Link>
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
