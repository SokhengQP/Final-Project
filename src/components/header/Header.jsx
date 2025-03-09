import { Link } from "react-router";
import { RiMovie2Line } from "react-icons/ri";
import { FaTv } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdExpandMore, MdPerson, MdOutlinePersonOutline } from "react-icons/md";
import { TbMenuDeep } from "react-icons/tb";
import Modes from '../../Modes';
import { useEffect, useState } from "react";

export default function Header() {
     const [menuOpen, setMenuOpen] = useState(false);

     useEffect(() => {
          const handleScroll = () => {
               const nav = document.getElementById('nav');
               if (window.scrollY >= 50) {
                    nav.classList.add('active-header');
               } else {
                    nav.classList.remove('active-header');
               }
          };
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     const links = [
          {
               category: 'Movie',
               icon: <RiMovie2Line size={24} />,
               items: [
                    { title: 'Now Playing', path: '/now-playing' },
                    { title: 'Popular', path: '/popular-movie' },
                    { title: 'Top Rated', path: '/top-rated-movie' },
                    { title: 'Upcoming', path: '/up-comming' }
               ]
          },
          {
               category: 'TV Show',
               icon: <FaTv size={24} />,
               items: [
                    { title: 'Popular', path: '/popular-tv' },
                    { title: 'Airing Today', path: '/airing-today' },
                    { title: 'On TV', path: '/on-tv' },
                    { title: 'Top Rated', path: '/top-rated-tv' },
               ]
          },
          {
               category: 'People',
               icon: <FaPeopleGroup size={24} />,
               items: [{ title: 'Popular People', path: '/popular-people' }]
          },
          {
               category: 'More',
               icon: <MdExpandMore size={24} />,
               items: [{ title: 'Discussions', path: '/discussions' }]
          }
     ];

     return (
          <header id="nav" className="fixed top-0 w-full hover:opacity-100 opacity-50 backdrop-blur-md z-50 transition-all duration-300 shadow-md">
               <div className="container mx-auto flex justify-between items-center py-3 px-4">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                         <img
                              src="https://cdn.pixabay.com/photo/2017/01/31/23/42/animal-2028258_1280.png"
                              alt="Logo"
                              className="h-16 w-16 rounded-full transition-transform hover:scale-110"
                         />
                    </Link>

                    {/* Desktop Menu (Hidden on Mobile) */}
                    <nav className="hidden md:flex items-center space-x-6">
                         {links.map(({ category, icon, items }) => (
                              <div key={category} className="relative group p-2 rounded-md">
                                   <div className="flex items-center gap-2 cursor-pointer">
                                        <span className="group-hover:-translate-x-1 group-hover:-rotate-6 group-hover:-translate-y-[1px] ">{icon}</span>
                                        <span className="font-bold text-sm animates">{category}</span>
                                   </div>
                                   {/* Dropdown */}
                                   <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                                        {items.map(({ title, path }) => (
                                             <Link key={title} to={path} className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                                  {title}
                                             </Link>
                                        ))}
                                   </div>
                              </div>
                         ))}
                    </nav>

                    {/* Icons + Mode Switcher */}
                    
                    <div className="flex items-center space-x-4">
                         <Link to="/log-in" className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                              <MdOutlinePersonOutline size={24} className="group-hover:hidden" />
                              <MdPerson size={24} className="hidden group-hover:block" />
                         </Link>
                         <Modes />
                         {/* Mobile Menu Button */}
                         <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                              <TbMenuDeep size={28} />
                         </button>
                    </div>
               </div>

               {/* Mobile Menu (Slide Down) */}
               <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-800 border-t`}>
                    {links.map(({ category, items }) => (
                         <div key={category} className="border-b">
                              <h3 className="font-bold px-4 py-2">{category}</h3>
                              <div className="flex flex-col space-y-1">
                                   {items.map(({ title, path }) => (
                                        <Link key={title} to={path} className="px-6 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                             {title}
                                        </Link>
                                   ))}
                              </div>
                         </div>
                    ))}
               </div>
          </header>
     );
}
