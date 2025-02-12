import { Link } from "react-router";
import { RiMovie2Line } from "react-icons/ri";
import { FaTv } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdExpandMore } from "react-icons/md";
import { CgLogIn } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import Modes from '../../Modes';

export default function Header() {
     const links = [
          {
               catory: 'Movie',
               icons: <RiMovie2Line size='24px' />,
               items: [
                    { id: 1, title: 'Now playing', path: '/now-playing' },
                    { id: 2, title: 'Popular', path: '/popular-movie' },
                    { id: 3, title: 'Top Rated', path: '/top-rated-movie' },
                    { id: 4, title: 'Upcomming', path: '/up-comming' },
               ]
          },
          {
               catory: 'Tv Show',
               icons: <FaTv size='24px' />,
               items: [
                    { id: 1, title: 'Popular', path: '/popular-tv' },
                    { id: 2, title: 'Airing Today', path: '/airing-today' },
                    { id: 3, title: 'On Tv', path: '/on-tv' },
               ]
          },
          {
               catory: 'People',
               icons: <FaPeopleGroup size='24px' />,
               items: [
                    { id: 1, title: 'Popular People', path: '/popular-people' }
               ]
          },

          {
               catory: 'More',
               icons: <MdExpandMore size='24px' />,
               items: [
                    { id: 1, title: 'Discussions', path: '/popular-people' }
               ]
          },

     ];

     return (
          <>
          
               <div className="flex justify-between items-center px-8 py-2 sticky top-0 bg-[#fdf0d5] dark:bg-[#272C39] z-50">
                    <Link to='/' className="flex flex-shrink-0" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="600">
                         <img id="logo" fetchpriority="high" className="aspect-square opacity-75 h-24 w-24 rounded-[50%] hover:[filter:drop-shadow(0_0_6px_#5a189a)_drop-shadow(0_0_6px_black)_drop-shadow(0_0_6px_black)_drop-shadow(0_0_6px_#ffba08)] active:[filter:drop-shadow(0_0_6px_#e85d04)_drop-shadow(0_0_6px_#ecf39e)_drop-shadow(0_0_6px_#ff9e00)_drop-shadow(0_0_6px_#240046)]
                         active:scale-110" src="https://cdn.pixabay.com/photo/2017/01/31/23/42/animal-2028258_1280.png" alt="my-profile" />
                    </Link>

                    <div className="flex flex-shrink-0 justify-between items-center gap-8">
                         {/* Movie */}
                         <div className="flex flex-row items-center justify-between gap-2 text-[14px]" data-aos="fade-down-left" data-aos-easing="ease-out-cubic" data-aos-duration="1000" data-aos-delay="300">
                              {links.map((catories) => {
                                   const { id, catory, icons, items } = catories;
                                   return (
                                        // hover:shadow-[0_0_10px]
                                        <div key={id} className="relative flex items-center gap-2 p-4 rounded-xl cursor-pointer hover:drop-shadow-[0_0_14px] group">

                                             <span className="group-hover:-translate-x-1 group-hover:-rotate-6">{icons}</span>

                                             <h1 className="">{catory}</h1>
                                             <div className="flex-col gap-2 z-10 bg-[#fdf0d576] w-32 p-4  absolute left-0 top-14 rounded-xl text-nowrap hidden group-hover:flex" >
                                                  {items.map((item, index) => {
                                                       const { title, path } = item;
                                                       return (
                                                            <Link to={path} key={index}>
                                                                 <span className="text-ellipsis hidden group-hover:flex text-[14px] font-[600] text-black"> {title} </span>
                                                            </Link>
                                                       )
                                                  })}
                                             </div>
                                        </div>
                                   )
                              })}

                         </div>

                         <div className="flex justify-between gap-8 items-center rounded-xl" data-aos="fade-down-left" data-aos-easing="ease-out-cubic" data-aos-duration="1000" data-aos-delay="300">

                              <Link to="/log-in" target="_blank">
                                   <CgLogIn size='20px' className="hover:translate-x-1 group-hover:rotate-6 cursor-pointer" />
                              </Link>

                              <div className="relative flex items-center ">
                                   <input id="value" type="text" placeholder="Search" className="text-[14px] bg-transparent outline-none border-2 dark:border-white border-black rounded-3xl h-10 px-4" />
                                   <IoSearch className="absolute right-4 hover:cursor-pointer" />
                              </div>

                              <Modes />
                              
                         </div>

                    </div>
               </div>
          
          
          </>
     )
}