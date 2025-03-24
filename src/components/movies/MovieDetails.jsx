import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMovieDetails, fetchTopBilledCast } from "../../features/movie-action/movieAction";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";
import { convertRuntime, Votes, innerDate, url } from '../../utility.js';
import ProgressRounded from "./details/ProgressRounded.jsx";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { faces, fallbackImg, faces_original } from '../../utility.js';
import { addToFavorites } from "../../features/favorite-action/favouriteSlice";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

export default function MovieDetails() {
     const dispatch = useDispatch();
     const params = useParams();
     const { details, creditMovie } = useSelector((state) => state.movie);
     const { favorites } = useSelector(state => state.favorites);
     const [isLoaded, setIsLoaded] = useState(false);

     useEffect(() => {
          document.title = 'Movie Details';
          dispatch(fetchMovieDetails(params.id));
          dispatch(fetchTopBilledCast(params.id));
     }, []);

     

     const { id, runtime, genres, poster_path, release_date, backdrop_path, title, original_title, vote_average, overview, tagline } = details;

     const handleAddToFavorites = (movie) => {
          setTimeout(() => {
               const movieItem = { ...movie, media_type: 'movie' };
               dispatch(addToFavorites(movieItem));
          }, 500);
     };

     const isFavorite = (movieId) => {
          return favorites.some(fav => fav.id === movieId);
     };
     const isFav = isFavorite(id);

     const [visibleCount, setVisibleCount] = useState(8);
     const loadmore = () => {
          setVisibleCount((prev) => prev + 8);
     }

     return (
          <>
               {/* Background Image */}
               <div className="fixed w-full top-20 brightness-125 2xl:brightness-50 -z-50 opacity-25">
                    <img
                         onLoad={() => setIsLoaded(true)}
                         onError={() => setIsLoaded(true)}
                         className={`${!isLoaded ? 'blur-xl' : ''} w-full`}
                         src={backdrop_path ? url + backdrop_path : fallbackImg}
                         alt={title || ''}
                    />
               </div>

               {/* Main Content */}
               <div className="relative px-4 sm:px-8 md:px-16 z-10">
                    <div className=" grid grid-cols-1 2xl:grid-cols-2 mt-20 sm:mt-24 md:mt-[120px] place-content-center rounded-3xl relative overflow-hidden">
                         {/* Poster Image (Hidden on smaller screens) */}
                         <div className="z-10 group cursor-pointer hidden 2xl:flex items-center justify-center">
                              <img
                                   onLoad={() => setIsLoaded(true)}
                                   onError={() => setIsLoaded(true)}
                                   className={`object-cover rounded-xl brightness-125 w-[40%] ${!isLoaded ? 'blur-xl' : ''}`}
                                   src={poster_path ? faces_original + poster_path : fallbackImg}
                                   alt={original_title ? original_title : "Unknown"}
                              />
                         </div>

                         {/* Movie Details */}
                         <div className="z-10 flex flex-col gap-6 p-4 sm:p-6 rounded-xl w-fit">
                              {/* Title and Rating */}
                              <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                   <p className="text-2xl sm:text-3xl md:text-4xl font-bold custom-drop-shadow cursor-pointer text-wrap">
                                        {title ? title : 'Loading...'}
                                   </p>
                                   <div className="w-12 h-12 sm:w-14 sm:h-14">
                                        <ProgressRounded value={Votes(vote_average) || "0"} />
                                   </div>
                              </section>

                              <section className="flex items-center gap-2 sm:gap-4 flex-wrap text-gray-400">
                                   <aside className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
                                        <MdDateRange size="20" className="sm:w-6 sm:h-6" />
                                        <span>{release_date ? innerDate(release_date) : 'MM DD, YYYY'}</span>
                                   </aside>

                                   <aside className="flex items-center gap-2 flex-wrap">
                                        {genres?.map((item) => (
                                             <Link
                                                  key={item?.id}
                                                  to={`/genre/${item.id}-${item.name?.replace(/\s+/g, '-')}-movie`}
                                                  className="text-xs sm:text-sm md:text-base text-nowrap hover:bg-gray-600 px-3 py-1 rounded-3xl"
                                             >
                                                  {item.name}
                                             </Link>
                                        )) || "Not Found"}
                                   </aside>

                                   <aside className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
                                        <IoMdTime size="20" className="sm:w-6 sm:h-6" />
                                        <span>{convertRuntime(runtime) || ''}</span>
                                   </aside>
                              </section>

                              {/* Tagline and Overview */}
                              <section className="flex flex-col gap-2 cursor-pointer">
                                   <div className="text-sm sm:text-base md:text-lg italic text-gray-400">
                                        {tagline || ""}
                                   </div>
                                   <aside className="flex items-center gap-2">
                                        <GrOverview size="20" className="sm:w-6 sm:h-6" />
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Overview</h3>
                                   </aside>
                                   <p className="text-sm sm:text-base md:text-lg max-w-[600px] overflow-y-auto">
                                        {overview}
                                   </p>
                              </section>

                              {/* Play Trailer Button */}
                              <div className="flex flex-shrink-0 justify-between gap-6 w-full">
                                   <Link
                                        to={`/video/${details?.id}-${details?.title?.replace(/\s+/g, '-')}-movies`}
                                        className="flex flex-shrink-0 gap-2 justify-center items-center rounded-3xl text-md w-[50%] bg-red-500 py-2"
                                   >
                                        <FaPlay className="cursor-pointer" />
                                        <button>Play Trailer</button>
                                   </Link>

                                   <button
                                        className={`flex flex-shrink-0 justify-center w-[50%] items-center rounded-3xl text-md ${isFav ? 'cursor-not-allowed bg-black' : 'bg-[#090109] text-white '}`}
                                        onClick={() => handleAddToFavorites(details)}
                                        disabled={isFav}
                                   >

                                        {isFav ?
                                             <div className="flex items-center gap-2 text-white">
                                                  Added
                                                  <p className="text-red-500">
                                                       <MdFavorite />
                                                  </p>
                                             </div> :
                                             <p className="flex items-center gap-2">Add to Favorite <span>
                                                  <MdFavoriteBorder />
                                             </span> </p>}
                                   </button>
                              </div>


                         </div>
                    </div>
               </div>

               {/* Top Billed Cast Section */}
               <p className="rounded-md px-4 py-2 mx-4 sm:mx-8 md:mx-10 text-xl sm:text-2xl md:text-3xl mt-20 sm:mt-24 md:mt-36 font-semibold">
                    Top Billed Cast
               </p>

               <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto mx-16 py-6 sm:py-8 md:py-10 z-50">
                    {creditMovie?.cast ? (
                         creditMovie?.cast?.slice(0, visibleCount)?.map((castMember) => {
                              const { id, profile_path, name, character } = castMember;
                              return (
                                   <Link
                                        to={`/to-persons/${id}-${name?.replace(/\s+/g, "-")}`}
                                        className="custom-drop-shadow hover:scale-105 flex flex-col flex-shrink-0 items-center w-[120px] sm:w-[140px] 2xl:w-[200px] overflow-hidden cursor-pointer"
                                        key={id || name}
                                   >
                                        <img
                                             onLoad={() => setIsLoaded(true)}
                                             onError={() => setIsLoaded(true)}
                                             className={`${!isLoaded ? 'blur' : ''} h-[180px] sm:h-[200px] md:h-[260px] rounded-xl object-cover`}
                                             src={profile_path ? `${faces}${profile_path}` : fallbackImg}
                                             alt={`${name} as ${character}`}
                                        />
                                        <div className="font-semibold py-2 px-4 w-full text-center">
                                             <p className="truncate text-xs sm:text-[12px] md:text-[14px] xl:text-base">
                                                  {name}
                                             </p>
                                             <p className="truncate text-[10px] sm:text-[10px] md:text-[12px] xl:text-[14px] text-gray-400">
                                                  {character}
                                             </p>
                                        </div>
                                   </Link>
                              );
                         })
                    ) : (
                         <p className="text-gray-400 text-start w-full px-2">We don't have any cast information available.</p>
                    )}
                    <button onClick={loadmore}>
                         Load more
                    </button>
               </div>

               {/* Full Cast & Crew Link */}
               <div className="mx-4 sm:mx-8 md:mx-10 my-4 w-fit rounded-md px-2 py-1 hover:text-blue-500 cursor-pointer hover:scale-105 text-sm sm:text-base md:text-lg">
                    <Link to={`/movie/${details?.id}-${original_title?.replace(/\s+/g, '-')}/cast&crew`}>
                         Full Cast & Crew
                    </Link>
               </div>
          </>
     );
}