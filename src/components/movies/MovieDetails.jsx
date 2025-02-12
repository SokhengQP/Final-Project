import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { fetchMovieDetails } from "../../features/movie-action/movieAction";
import { IoExpand, IoGitMerge } from "react-icons/io5";
import { HiSaveAs } from "react-icons/hi";
import { FaRegHeart, FaPlay } from "react-icons/fa";
import { Link } from "react-router";


export default function MovieDetails() {
     const movie_ids = useParams();
     const dispatch = useDispatch();

     useEffect(() => {
          dispatch(fetchMovieDetails(movie_ids.id));
     }, []);

     const { details } = useSelector(state => state.movie);
     const { status, runtime, genres, poster_path, release_date, backdrop_path, title, original_title, vote_average, vote_count, overview } = details;

     // Convert {runtime}
     function convertRuntime(minutes) {
          const hour = Math.floor(minutes / 60);
          const remainMn = minutes % 60;
          return `${hour}h ${remainMn < 9 ? '0' + remainMn : remainMn}m`;
     }

     // const [first, setFirst] = useState();
     function convertDate(convertDate) {
          const fullDate = new Date(convertDate);
          const year = fullDate.getFullYear();
          return `${year}`;
     }

     function innerDate(monthNames) {
          const fullMonth = new Date(monthNames);
          const releaseMonth = fullMonth.getMonth();
          const releaseDay = fullMonth.getDay();
          const releaseYear = fullMonth.getFullYear();
          const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return `${mon[releaseMonth]}, ${releaseDay < 9 ? "0" + releaseDay : releaseDay}, ${releaseYear}`;
     }

     const url = `https://image.tmdb.org/t/p/w400`;
     return (
          <>
               <div className="flex justify-around items-center relative flex-shrink-0 overflow-clip h-[600px]">
                    <div className="z-10 relative group cursor-pointer">
                         <img className="rounded-xl  h-[500px] group-hover:blur-sm group-hover:opacity-40" src={url + poster_path} alt={original_title} />
                         <span className=" absolute flex items-center justify-center top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4">
                              <IoExpand size='60px' className="hidden group-hover:block group-hover:w-[100px]" />
                         </span>

                    </div>
                    <div className="w-[60%] h-[400px] z-10 flex flex-col">

                         <section className="flex items-center text-5xl flex-shrink-0">
                              <span className="font-[900] hover:text-gray-500">{title}</span>
                              <span>&nbsp;</span>
                              <span className="font-[700]">({convertDate(release_date)})</span>
                         </section>

                         <section className="flex py-1 items-center text-[1rem]">
                              <div className="rounded-sm border w-fit h-6 flex items-center justify-center px-1">{status?.charAt(0) || "Not Found"}</div>

                              <span className="px-1">&nbsp;{innerDate(release_date)}</span>&nbsp;
                              <span> •</span>
                              <section className="flex gap-2 px-2">
                                   {genres?.map((item) => {
                                        const { name, id } = item;
                                        return (
                                        <Link key={id} to='/' className="text-nowrap leading-6">{name}</Link>
                                   )
                                   }) || "Not Found"}
                              </section>

                              <span>•</span>
                              <span className="px-1">{convertRuntime(runtime) || 'Not Found'}</span>
                         </section>

                         <br />
                         {/* <button onClick={clickme}>Click me</button> */}
                         <section className="flex flex-col font-[700] ">
                              <span>User Score</span>
                              <section className="flex gap-4 items-center">
                                   <div className=" w-[16%] pointer-events-none outline-none bg-transparent">{vote_average}</div>
                                   <div id="rounded-rate" className=""></div>
                                   <div className="text-2xl">Rate</div>
                                   <span className="rounded-3xl px-4 py-2 bg-[#023047] text-[16px] hover:scale-105">What's your <span className="underline">Vibe?</span> 😆</span>
                              </section>

                              <div className="flex gap-10 items-center justify-start relative">

                                   <section className="cursor-pointer rounded-[50%] w-12 h-12 flex justify-center items-center bg-[#023047] before:absolute before:border-none before:hover:content-['Favorite'] before:hidden before:hover:block before:-bottom-10 before:bg-[#023047] before:p-1 before:rounded-md before:z-10">
                                        <FaRegHeart size='16px' className="" />
                                   </section>

                                   <section className="cursor-pointer rounded-[50%] w-12 h-12 flex justify-center items-center bg-[#023047] before:absolute before:hover:content-['Watchlist'] before:-bottom-10 before:hidden before:hover:block before:bg-[#023047] before:p-1 before:rounded-md before:z-10">
                                        <HiSaveAs size='16px' />
                                   </section>

                                   <section className="cursor-pointer flex justify-center items-center gap-2 group py-2 px-1 group">
                                        <FaPlay size='16px' className="group-hover:text-gray-400" />
                                        <p className="font-[600] group-hover:text-gray-400">Play Trailor</p>
                                   </section>

                              </div>
                         </section>

                         <br />

                         <section className="relative w-fit ">
                              <h3 className="w-fit text-[20px] font-[700]">Overview</h3>
                              <p>{overview}</p>
                         </section>

                    </div>
                    <img className="pointer-events-none rounded-md w-full absolute right-0 brightness-50 opacity-50" fetchpriority="high" src={url + backdrop_path} alt={original_title} />
               </div>
          </>
     )
}
