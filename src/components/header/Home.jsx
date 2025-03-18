import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchDiscover } from "../../features/movie-action/movieAction";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Link } from "react-router";
import { Votes } from "../../utility";
import InfiniteScroll from '../../styles/InfiniteScroll';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { IoSearchOutline } from "react-icons/io5";
import { fetchSearchResults } from '../../features/search/fetchSearchResults';
import { url, empty } from "../../utility";
import GradientText from '../../styles/GradientText';

export default function Home() {
     const dispatch = useDispatch();
     useEffect(() => {
          dispatch(fetchMovies(timeWindow));
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

     
     let imageItems = discover?.results?.map((item) => ({
          src: `${url}${item.poster_path || empty}`,
          alt: item.original_title,
     })) || [];

     return (
          <>
               <div style={{ height: '600px', position: 'relative' }}>
                    <InfiniteScroll
                         items={imageItems}
                         isTilted={true}
                         tiltDirection='right'
                         autoplay={true}
                         autoplaySpeed={0.2}
                         autoplayDirection="down"
                         pauseOnHover={true}
                    />
               </div>

               <div className="absolute z-10 top-20 left-2/4 -translate-x-2/4  sm:top-32  md:top-32  xl:top-32  2xl:top-32 ">
                    <GradientText
                         colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                         animationSpeed={4}
                         showBorder={false}
                         className="custom-class"
                    >
                         <p className="text-5xl font-[800] px-4">Welcome to FoxMovie</p>
                    </GradientText>
                    <span className="text-[12px] flex justify-center text-center  md:text-md  xl:text-md  2xl:text-xl text-shadow">Millions of movies, TV shows and people to discover. Explore now.</span>

                    <section className='relative flex items-center group overflow-hidden rounded-xl bg-[rgba(128,128,128,0.50)]'>
                         <input
                              type="text"
                              placeholder="Search Movies, TV shows, People..."
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              className="w-full h-[40px] px-4 backdrop-blur-[20px] bg-transparent focus:backdrop-blur-[60px] border-none placeholder:text-[rgb(128,128,128,0.80)]  placeholder:focus:text-white
                                   text-[10px] xl:h-[60px] xl:placeholder:text-md 2xl:text-[18px]"/>
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

               <section className="px-10">
                    {query && (
                         <div>
                              <h3 className="text-xl font-semibold py-4">Search Results</h3>
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

               <div className="flex items-center justify-start gap-8 my-4 px-16">
                    <h2 className="text-base 2xl:text-3xl">Trending</h2>
                    <button onClick={toggleDay} className={`text-[14px] px-2 rounded-3xl cursor-pointer py-1 my-2 w-[140px] hover:bg-gray-500 bg-gray-600 2xl:text-xl`}>
                         {timeWindow === `day` ? 'This Week' : 'This Day'}
                    </button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 px-16">
                    {
                         data.results?.map(item => {
                              let { id, poster_path, original_title, backdrop_path, release_date, media_type, first_air_date, name, vote_average } = item;
                              return (
                                   <Link key={id} to={media_type === 'movie' ? `/movie-details/${id}` : `/tv-details/${id}`}>
                                        <MyPropsMovie poster={backdrop_path ? url + poster_path : empty} originalTitle={original_title || name} votes={Votes(vote_average)} releaseDate={release_date || first_air_date} />
                                   </Link>
                              )
                         })
                    }
               </div>
          </>
     )
}
