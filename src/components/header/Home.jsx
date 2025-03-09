import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular, fetchMovies, fetchNowPlaying, fetchDiscover } from "../../features/movie-action/movieAction";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Link } from "react-router";
import { Votes } from "../../utility";
import { Carousel } from 'flowbite-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay } from 'swiper/modules';
import { IoSearchOutline } from "react-icons/io5";
import { fetchSearchResults } from '../../features/search/fetchSearchResults';


const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;


export default function Home() {
     const dispatch = useDispatch();
     useEffect(() => {
          dispatch(fetchMovies(timeWindow));
          dispatch(fetchNowPlaying());
          dispatch(fetchPopular());
          dispatch(fetchDiscover());
     }, []);

     const [query, setQuery] = useState('');
     const { results, loading, error } = useSelector(state => state.search);
     const { data, discover } = useSelector(state => state.movie);
     const [timeWindow, setTimeWindow] = useState('day');

     function toggleDay() {
          setTimeWindow((prev) => prev === 'day' ? 'week' : 'day');
          dispatch(fetchMovies(timeWindow));
     }

     const handleSearch = () => {
          if (query.trim()) {
               dispatch(fetchSearchResults(query));
          }
     };

     return (
          <>
               <Swiper
                    effect="fade-in"
                    autoplay={{ delay: 4000 }}
                    modules={[EffectFade, Autoplay]}
               >
                    <Carousel>
                         {discover.results?.map(db => {
                              const { id, backdrop_path, original_title } = db;
                              return (
                                   <SwiperSlide key={id} >
                                        <img className="brightness-50 w-screen object-contain -z-10" src={url + backdrop_path} alt={original_title} />
                                   </SwiperSlide>
                              )
                         })}
                    </Carousel>
               </Swiper>

               <div className="absolute z-10 top-20 left-2/4 -translate-x-2/4  sm:top-32  md:top-32  xl:top-32  2xl:top-32 ">
                    <h2 className="text-[18px] flex justify-center py-4 font-[800]  sm:text-2xl  md:text-3xl  xl:text-4xl 2xl:text-5xl text-shadow ">Welcome to Fox Movie</h2>
                    <span className="text-[12px] flex justify-center text-center  md:text-md  xl:text-md  2xl:text-xl text-shadow">Millions of movies, TV shows and people to discover. Explore now.</span>

                    <section className='relative flex items-center group overflow-hidden rounded-3xl bg-[rgba(128,128,128,0.50)]'>
                         <input
                              type="text"
                              placeholder="Search Movies, TV shows, People..."
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              className="w-full h-[40px] px-5 backdrop-blur-[20px] bg-transparent focus:backdrop-blur-[60px] border-none placeholder:text-[rgb(128,128,128,0.80)]  placeholder:focus:text-white
                                   text-[14px] xl:h-[60px] xl:placeholder:text-md 2xl:text-[18px]"/>
                         <button
                              id="seek-movie"
                              onClick={handleSearch}
                              className='absolute -right-6 group-focus-within:right-6 cursor-pointer'
                         >
                              <IoSearchOutline size={'25px'} />
                         </button>
                    </section>
               </div>

               {/* Show search results if there are any */}
               
               <section>
                    {query && (
                         <div className="">
                              <h3 className="text-xl font-semibold py-4 px-10">Search Results</h3>
                              {loading ? (
                                   <p>Loading...</p>
                              ) : error ? (
                                   <p className="text-red-500">Something went wrong: {error.message}</p>
                              ) : results.length === 0 ? (
                                   <p>No results found</p>
                              ) : (
                                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 px-8">
                                        {results.map(item => {
                                             let { id, poster_path, original_title, release_date, media_type, first_air_date, name, vote_average } = item;
                                             return (
                                                  <Link key={id} to={media_type === 'movie' ? `/movie-details/${id}` : `/tv-details/${id}`}>
                                                       <MyPropsMovie poster={poster_path ? url + poster_path : empty} originalTitle={original_title || name} votes={vote_average ? Votes(vote_average) : 0} releaseDate={release_date || first_air_date} />
                                                  </Link>
                                             )
                                        })}
                                   </div>
                              )}
                         </div>
                    )}
               </section>

               <div className="flex items-center justify-start mx-4 gap-8 my-4">
                    <h2 className="text-2xl">Trending</h2>
                    <button onClick={toggleDay} className={`rounded-3xl cursor-pointer py-2 w-[140px] hover:bg-gray-500 bg-gray-600 transition-all`}>
                         {timeWindow === `day` ? 'This Week' : 'This Day'}
                    </button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 px-8">
                    {data.results?.map(item => {
                         let { id, poster_path, original_title, backdrop_path, release_date, media_type, first_air_date, name, vote_average } = item;
                         return (
                              <Link key={id} to={media_type === 'movie' ? `/movie-details/${id}` : `/tv-details/${id}`}>
                                   <MyPropsMovie poster={backdrop_path ? url + poster_path : empty} originalTitle={original_title || name} votes={Votes(vote_average)} releaseDate={release_date || first_air_date} />
                              </Link>
                         )
                    })}
               </div>
          </>
     )
}
