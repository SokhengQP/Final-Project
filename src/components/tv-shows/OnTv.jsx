import { Pagination } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnTv } from "../../features/tv-actions/tvAction";
import { Link } from "react-router";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Votes } from "../../utility";
import { setPage } from "../../features/tv-actions/tvSlice";

// AiringToday
const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;


export default function OnTv() {

     const dispatch = useDispatch();
     let { onTv, page } = useSelector((state) => state.myTvs);
     const totalPage = onTv?.total_pages || 1;


     useEffect(() => {
          document.title = 'TV Shows Airing Today';
          dispatch(fetchOnTv(page));
     }, [dispatch, page])


     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));
     };

     return (

          <>
               <div className="my-[120px]">

                    <div className="flex justify-between items-center my-4 px-16">
                         <h2 className="text-base md:text-xl xl:text-2xl">Currently Airing TV Shows</h2>
                         <Pagination
                              currentPage={page}
                              totalPages={totalPage ?? 1}
                              onPageChange={handlePageChange}
                              showIcons
                              className="mb-2 p-0"
                         />
                    </div>

                    <section className="grid grid-cols-6 gap-10 px-16 ">
                         {
                              onTv?.results?.length > 0 ? (
                                   onTv?.results?.map(item => {
                                        const { id, name, first_air_date, poster_path, vote_average, original_name } = item;
                                        return (
                                             <Link to={`/tv-details/${id}-${original_name?.replace(/\s+/g, '-')}`} key={id} className="cursor-pointer gap-10">
                                                  <MyPropsMovie
                                                       originalTitle={name || 'Unavailable'}
                                                       poster={poster_path ? (url + poster_path) : (empty)}
                                                       votes={Votes(vote_average)}
                                                       releaseDate={first_air_date || 'Unavailable'}
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
          </>
     )
}