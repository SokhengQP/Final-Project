import { act, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from '../../features/movie-action/movieAction';
import { Link } from "react-router";
// import { decrement, increment } from "../../features/counter/counterSlice";

export default function Home() {

     const dispatch = useDispatch();
     const { data } = useSelector((state) => state.movie);
     const url = `https://image.tmdb.org/t/p/w400`;
     

     function getMonths(monthName) {
          const months = [
               "Jan", "Feb", "Mar", "Apr", "May", "Jun",
               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
          return months[monthName];
     }
     
     useEffect(() => {
          document.title = 'Movie';
          dispatch(fetchMovies());
          
     }, []);

     

     return (
          <>

               <div className="relative flex justify-center -z-10">
                    <h1 className="text-5xl -z-10 my-5">F~Movie</h1>
                    <span className="absolute top-0 left-0 h-[300px] w-full blur-[200px] opacity-40 dark:bg-[#fdf0d5]"></span>
               </div>


               <div className="flex justify-center items-center overflow-hidden flex-nowrap gap-8 p-4">
                    {
                         data.results?.map((db) => {
                              const { id, poster_path, title } = db;
                              return (
                                   <img key={id} className="border-none rounded-2xl w-[200px] shadow-[0_0_10px]" id="img-slider" src={url + poster_path} alt={title} />
                              )
                         })
                    }
               </div>


               <div className="flex justify-cen items-center relative gap-4">
                    <span className="title text-3xl mx-[48px] py-[10px] font-[600]">Trending</span>

                    <div className="flex items-center justify-center gap-2 border rounded-3xl relative">

                         <span className=" rounded-3xl cursor-pointer py-1 px-3">Today</span>
                         <span className=" rounded-3xl cursor-pointer py-1 px-4">This Week</span>

                    </div>

                    {/* <span className="blur-[40px] opacity-40 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-gray-500 via-green-500 via-green-500 via-teal-500 via-blue-500 to-purple-500 absolute top-0 h-24 w-80 "></span>      */}
               </div>

               <div className="border-4 border-transparent rounded-3xl shadow-inner bg-[#4141413f] backdrop-blur-3xl flex px-4 py-2 overflow-x-scroll items-center gap-8 mx-10">
                    {data.results?.flatMap((db) => {
                         
                         const { id, poster_path, title, release_date } = db;
                         const dates = new Date(release_date);
                         const days = dates.getDay();
                         const years = dates.getFullYear();
                         const monthNames = getMonths(dates.getMonth());
                         
                         return (
                              <Link key={id} to={`/movie-details/${id}`} className="my-4 cursor-pointer border-none flex flex-col justify-center flex-shrink-0 rounded-md w-[140px] h-fit shadow-[0_0_8px] overflow-clip">
                                   <img className="object-contain" src={url + poster_path} alt={title} />
                                   <div className="m-2">
                                        
                                        <p className="font-[800] text-[1rem] hover:text-blue-500 overflow-x-scroll text-nowrap">{title}</p>
                                        <p className="text-gray-400 text-[14px]">{monthNames} {days < 9 ? `0${days}` : `${days}`}, {years}</p>
                                        
                                   </div>
                              </Link>
                         )
                    })}
               </div>

          </>
     )
}


