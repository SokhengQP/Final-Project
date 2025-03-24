import { Link } from "react-router";
import { RiMovie2Line } from "react-icons/ri";
import { FaTv } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdPerson, MdOutlineFavoriteBorder } from "react-icons/md";
import { TbAccessPointOff, TbMenuDeep } from "react-icons/tb";
import Modes from '../../styles/Modes';
import { useEffect, useState } from "react";
import main_logo from "../../source-image/fox_logo.jpg"
import { VscGoToSearch } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../../features/auths/authAction";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Dropdown } from "flowbite-react";


export default function Header() {
     const [menuOpen, setMenuOpen] = useState(false);
     const { isAuthenticated, profile, accessToken } = useSelector(state => state.authSignIn);
     const dispatch = useDispatch();
     const [isHeaderVisible, setIsHeaderVisible] = useState(true);
     const [lastScrollY, setLastScrollY] = useState(0);

     useEffect(() => {
          const handleScroll = () => {
               const currentScrollY = window.scrollY;
               if (currentScrollY > lastScrollY && currentScrollY > 50) {
                    setIsHeaderVisible(false);
               } else if (currentScrollY < lastScrollY) {
                    setIsHeaderVisible(true);
               }
               setLastScrollY(currentScrollY);
          };

          window.addEventListener('scroll', handleScroll, { passive: true });
          return () => window.removeEventListener('scroll', handleScroll);
     }, [lastScrollY]);

     useEffect(() => {
          const handleActiveHeader = () => {
               const nav = document.getElementById('nav');
               if (window.scrollY >= 50) {
                    nav.classList.add('active-header');
               } else {
                    nav.classList.remove('active-header');
               }
          };
          window.addEventListener('scroll', handleActiveHeader);
          return () => window.removeEventListener('scroll', handleActiveHeader);
     }, []);

     useEffect(() => {
          if (accessToken) {
               dispatch(getProfile(accessToken));
          }
     }, [accessToken, dispatch]);

     const handleLogout = () => {
          dispatch(logout());
          navigate('/log-in');
     };

     const handleMenuItemClick = () => {
          setMenuOpen(false);
     };

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
               items: [{ title: 'Popular People', path: '/popular-person' }]
          },
          {
               category: 'Favorite',
               icon: <MdOutlineFavoriteBorder size={24} />,
               items: [{ title: 'Favourite', path: '/to-stock-favor' }]
          },
          {
               category: 'Search',
               icon: <VscGoToSearch size={24} />,
               items: [{ title: 'Search', path: '/search-progress' }]
          },
     ];



     return (
          <header id="nav" className={`fixed top-0 w-full backdrop-blur-xl z-50 transition-all duration-300 shadow-md px-16 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
               <div className="container flex justify-between items-center py-0">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 rounded-3xl custom-drop-shadow">
                         <img id="logo" className="aspect-square p-4 h-24 w-24 rounded-3xl cursor-pointer hover:scale-105" src={main_logo} alt="FoxMovie" />
                    </Link>

                    {/* Desktop Menu (Hidden on Mobile) */}
                    <nav className="hidden md:flex items-center">
                         {links.map(({ category, icon, items }) => (
                              <div key={category} className="relative group p-2 rounded-md">
                                   <div className="flex items-center gap-2 cursor-pointer custom-drop-shadow px-4 py-2 rounded-xl border-transparent border-2 hover:border-current">
                                        <span className="group-hover:-translate-x-1">{icon}</span>
                                        <span className="font-bold text-sm animates text-nowrap">{category}</span>
                                   </div>
                                   <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                                        {items.map(({ title, path }) => (
                                             <Link key={title} to={path} className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                                  <div>{title}</div>
                                             </Link>
                                        ))}
                                   </div>
                              </div>
                         ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                         <div className="relative p-2 rounded-xl flex items-center">
                              {
                                   !isAuthenticated ? (
                                        <Link to={`/log-in`} className="flex items-center gap-2 hover:bg-gray-600 px-4 py-2 rounded-lg active-header">
                                             <FiLogOut size='20px' />
                                             <p>Sign in</p>
                                        </Link>) :
                                        <Dropdown label="" dismissOnClick={false} renderTrigger={() => <img src={profile?.avatar} alt={profile?.name} className="w-12 hover:rounded-xl rounded-[50%] cursor-pointer" />}>
                                             <Dropdown.Item onClick={handleLogout} className="text-nowrap">Sign out   <FiLogIn size='20px' /></Dropdown.Item>
                                        </Dropdown>
                              }
                              <MdPerson size={24} className="hidden group-hover:block" />
                         </div>
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
                                        <Link
                                             key={title}
                                             to={path}
                                             className="px-6 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                             onClick={handleMenuItemClick} // Add onClick handler here
                                        >
                                             <section>{title}</section>
                                        </Link>
                                   ))}
                              </div>
                         </div>
                    ))}
               </div>
          </header>
     );
}
