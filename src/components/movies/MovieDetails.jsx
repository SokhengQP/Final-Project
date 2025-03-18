import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { fetchMovieDetails, fetchTopBilledCast } from "../../features/movie-action/movieAction";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";
import { convertRuntime, Votes, innerDate } from '../../utility.js';
import ProgressRounded from "./details/ProgressRounded.jsx";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { Blurhash } from "react-blurhash";

const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;


export default function MovieDetails() {
     const dispatch = useDispatch();
     const params = useParams();
     const { details, creditMovie } = useSelector((state) => state.movie);


     useEffect(() => {
          document.title = 'Movie Details';
          dispatch(fetchMovieDetails(params.id));
          dispatch(fetchTopBilledCast(params.id));
     }, []);

     const { id, runtime, genres, poster_path, release_date, backdrop_path, title, original_title, vote_average, overview, tagline } = details;

     const [loadImg, setLoadImg] = useState(false);
     useEffect(() => {
          const imgs = new Image();
          imgs.onload = () => {
               setLoadImg(true);
          }
          imgs.src = url + poster_path;
     }, [url + poster_path]);

     return (
          <>
               <div className="mb-20">
                    <div className="flex h-screen justify-center gap-40 rounded-3xl items-center relative flex-shrink-0 overflow-clip py-4 mx-16">

                         <div className="z-10 group cursor-pointer w-[340px]">

                              <img className="object-contain rounded-xl " src={poster_path ? url + poster_path : empty} alt={original_title ? original_title : "Unknown"} />
                         </div>

                         <div className="z-10 flex flex-col gap-8 hover:backdrop-blur-[20px] p-4 hover:bg-[#80808084] rounded-xl ">
                              <section className="flex flex-col justify-center flex-shrink flex-wrap gap-2 cursor-pointer">
                                   <section className="flex gap-4 items-center justify-start">
                                        <p className="font-[800] text-[2.2rem] custom-drop-shadow cursor-pointer text-wrap">{title ? title : 'Loading...'}</p>
                                        <div>
                                             <ProgressRounded value={Votes(vote_average) || "0"} />
                                        </div>
                                   </section>

                                   <section className="flex gap-4">

                                        <aside className="rounded-sm flex gap-1 items-center justify-center">
                                             <MdDateRange size='24px' />
                                             <section>{release_date ? innerDate(release_date) : 'MM DD, YYYY'}</section>
                                        </aside>

                                        <aside className="flex items-center gap-1">
                                             {
                                                  genres?.map((item) => {
                                                       return (
                                                            <Link key={item?.id} to={`/genre/${item.id}-${item.name?.replace(/\s+/g, '-')}-movie`} className="text-nowrap bg-[#80808084] hover:bg-[gray] px-4 py-1 rounded-3xl">{item.name}</Link>
                                                       )
                                                  }) || "Not Found"
                                             }
                                        </aside>

                                        <aside className="flex gap-1 items-center">
                                             <IoMdTime size='24px' />
                                             <span className="">{convertRuntime(runtime) || ''}</span>
                                        </aside>

                                   </section>

                              </section>


                              <section className="flex gap-2 flex-col cursor-pointer">
                                   <div className="text-gray-400 ">{tagline || ""}</div>
                                   <aside className="flex items-center gap-2">
                                        <GrOverview size='24px' />
                                        <h3 className="text-[20px] font-[700] cursor-pointer">Overview</h3>
                                   </aside>

                                   <p className="w-[600px] overflow-y-auto">{overview}</p>
                              </section>


                              <Link to={`/video/${details?.id}-${details?.title?.replace(/\s+/g, '-')}-movies`} className="flex bg-[rgba(255,0,0,0.70)] hover:bg-[rgba(255,0,0,0.60)] px-4 py-2 rounded-3xl w-fit gap-2 items-center flex-shrink-0">
                                   <FaPlay className="cursor-pointer" size='24px' />
                                   <button>Play Trailer</button>
                              </Link>

                         </div>
                    </div>

               </div>

               <p className="rounded-md px-2 py-1 mx-10 text-3xl mt-36">Top Billed Cast</p>

               <div className="flex items-center gap-6 overflow-x-auto px-16 py-10">
                    {
                         creditMovie?.cast?.length > 0 ? (
                              creditMovie?.cast?.map((castMember) => {
                                   const { id, profile_path, name, character } = castMember;
                                   return (
                                        <Link to={`/to-persons/${id}-${name?.replace(/\s+/g, "-")}`} key={id || name} className="custom-drop-shadow hover:scale-105 flex flex-col flex-shrink-0 items-center w-[140px] 2xl:w-[200px] overflow-hidden cursor-pointer">
                                             
                                             <img
                                                  className="w-full h-[200px] rounded-xl md:h-[260px] object-cover"
                                                  src={profile_path ? `${url}${profile_path}` : empty}
                                                  alt={`${name} as ${character}`}
                                                  loading="lazy"
                                                  onError={(e) => (e.target.src = empty)}
                                             />
                                             <div className="font-semibold py-2 px-4 w-full">
                                                  <p className="truncate text-[12px] md:text-[14px] xl:text-base">
                                                       {name}
                                                  </p>
                                                  <p className="truncate text-[10px] md:text-[12px] xl:text-[14px]">
                                                       {character}
                                                  </p>
                                             </div>
                                        </Link>
                                   );
                              })
                         ) : (
                              <p className="text-gray-400 text-start w-full px-2">We don&apos;t have any cast information available.</p>
                         )
                    }
               </div>

               <div className="mx-10 my-4 w-fit rounded-md px-2 py-1 hover:text-blue-500 cursor-pointer hover:scale-105">
                    <Link to={`/movie/${details?.id}-${original_title?.replace(/\s+/g, '-')}/cast&crew`}>Full Cast & Crew</Link>
               </div>


               <div className="absolute w-full top-0 brightness-50 opacity-25">
                    <img className="w-full border" src={backdrop_path ? url + backdrop_path : empty} alt={title || ''} />
               </div>
          </>
     )
}
