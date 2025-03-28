import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchDiscover } from "../../features/movie-action/movieAction";
import { MyPropsMovie } from "../../props/MyPropsMovie";
import { Link } from "react-router";
import { Votes } from "../../utility";
import InfiniteScroll from '../../styles/InfiniteScroll';
import { faces, fallbackImg } from "../../utility";
import GradientText from '../../styles/GradientText';
import { addToFavorites } from "../../features/favorite-action/favouriteSlice";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";


export default function Home() {
     const InfiniteScrollMemo = React.memo(InfiniteScroll);
     const dispatch = useDispatch();

     useEffect(() => {
          dispatch(fetchMovies(timeWindow));
          dispatch(fetchDiscover());
     }, []);

     const { favorites } = useSelector(state => state.favorites);
     const { data, discover } = useSelector(state => state.movie);
     const [timeWindow, setTimeWindow] = useState('day');

     function toggleDay() {
          setTimeWindow((prev) => prev === 'day' ? 'week' : 'day');
          dispatch(fetchMovies(timeWindow));
     }

     let imageItems = discover?.results?.map((item) => ({
          src: `${faces}${item.poster_path || fallbackImg}`,
          alt: item.original_title,
     })) || [];


     const handleAddToFavorites = (movie) => {
          setTimeout(() => {
               dispatch(addToFavorites(movie));
          }, 500);
     };

     const isFavorite = (movieId) => {
          return favorites.some(fav => fav.id === movieId);
     };


     return (
          <>
               <div style={{ height: '600px', position: 'relative' }}>
                    <InfiniteScrollMemo
                         items={imageItems}
                         isTilted={true}
                         tiltDirection='right'
                         autoplay={true}
                         autoplaySpeed={0.4}
                         autoplayDirection="down"
                         pauseOnHover={true}
                    />
               </div>

               <div className="absolute z-10 top-20 left-2/4 -translate-x-2/4 sm:top-32 md:top-32 xl:top-32 2xl:top-32">
                    <GradientText
                         colors={["#40ffaa", "#3c096c", "#40ffaa", "#ff9e00", "#40ffaa"]}
                         animationSpeed={4}
                         showBorder={false}
                         className="custom-class"
                    >

                         <div className="flex flex-col gap-4 p-7">
                              <p className="text-5xl font-[800] px-4 text-center">Welcome to<br />
                                   Fox Movie
                              </p>

                         </div>

                    </GradientText>
               </div>


               {/* Trending Section with Add to Favorite button */}
               <div className="flex items-center justify-start gap-8 my-4 px-8 md:px-16">
                    <h2 className="text-base 2xl:text-3xl">Trending</h2>
                    <button
                         onClick={toggleDay}
                         className="text-[14px] px-2 rounded-3xl cursor-pointer py-1 my-2 w-[140px] hover:bg-gray-500 bg-gray-600 2xl:text-xl"
                    >
                         {timeWindow === 'day' ? 'This Week' : 'This Day'}
                    </button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 md:gap-16 px-8 md:px-16">
                    {data.results?.map(item => {
                         let { id, poster_path, original_title, backdrop_path, release_date, media_type, first_air_date, name, vote_average } = item;
                         const isFav = isFavorite(id);
                         return (
                              <div key={id} className="relative">
                                   <Link to={media_type === 'movie' ? `/movie-details/${id}` : `/tv-details/${id}`}>
                                        <MyPropsMovie
                                             poster={backdrop_path ? faces + poster_path : fallbackImg}
                                             originalTitle={original_title || name}
                                             votes={Votes(vote_average)}
                                             releaseDate={release_date || first_air_date}
                                        />
                                   </Link>
                                   
                                   <button
                                        className={`absolute right-4 top-2 mt-2 px-2 py-2 rounded-[50%] text-md ${isFav ? 'bg-black text-red-600 cursor-not-allowed' : 'bg-[#090109] text-white '}`}
                                        onClick={() => handleAddToFavorites(item)}
                                        disabled={isFav}
                                   >
                                        {isFav ? <MdFavorite /> : <MdFavoriteBorder />}
                                   </button>
                              </div>
                         )
                    })}
               </div>
          </>
     )
}