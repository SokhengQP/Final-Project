import React, { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';

import { createBrowserRouter, RouterProvider, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './features/store.js';

// Components
import Header from './components/header/Header.jsx';
import Home from './components/header/Home';
import MasterLayout from './MasterLayout';
import NowPlaying from './components/movies/NowPlaying';
import PopularMovie from './components/movies/PopularMovie';
import TopRatedMovie from './components/movies/TopRatedMovie';
import Upcomming from './components/movies/Upcomming';
import AiringToday from './components/tv-shows/AiringToday';
import OnTv from './components/tv-shows/OnTv';
import PopularTv from './components/tv-shows/PopularTv';
import TopRateTv from './components/tv-shows/TopRateTv';
import MovieDetails from './components/movies/MovieDetails.jsx';
import PathError from './PathError.jsx';
import PopularPeople from './components/popular-people/PopularPeople';
import LogIn from './components/signup/LogIn';
import TvDetails from './components/movies/TvDetails';
import Footer from './components/header/Footer.jsx';
import ProgressRounded from './components/movies/details/ProgressRounded.jsx';
import VideoType from './components/movies/details/VideoType.jsx';
import GenresType from './components/movies/details/GenresType.jsx';
import CastCrew from './components/movies/details/CastCrew.jsx';
import CastCrewTv from './components/movies/details/CastCrewTv.jsx';
import GenreTvType from './components/movies/details/GenreTvType.jsx';
import VdoTv from './components/tv-shows/details/VdoTv.jsx';
import Persons from './components/popular-people/Persons.jsx';
import Favorite from './components/favor/Favorite.jsx'
import ActingTV from './components/popular-people/acting/ActingTv.jsx';
import ActingMV from './components/popular-people/acting/ActingMV.jsx';


export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]);

  return null; // This component doesn't render anything
};

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <>
        <ScrollToTop />
        <MasterLayout />
      </>,
    children: [
      {
        path: '/header',
        element: <Header />
      },
      {
        path: '/',
        element: <Home />
      },
      // Movies
      {
        path: '/popular-movie',
        element: <PopularMovie />
      },

      {
        path: '/now-playing',
        element: <NowPlaying />,
      },

      {
        path: '/up-comming',
        element: <Upcomming />
      },
      {
        path: '/top-rated-movie',
        element: <TopRatedMovie />
      },

      // Tv Shows
      {
        path: '/popular-tv',
        element: <PopularTv />
      },

      {
        path: '/airing-today',
        element: <AiringToday />
      },

      {
        path: '/on-tv',
        element: <OnTv />
      },

      {
        path: '/top-rated-tv',
        element: <TopRateTv />
      },

      // People
      {
        path: '/popular-person',
        element: <PopularPeople />
      },

      // Favorite
      {
        path: '/favorites-component',
        element: <Favorite />
      },

      {
        path: '/to-persons/:id',
        element: <Persons />
      },

      {
        path: '/video/:id',
        element: <VideoType />
      },

      {
        path: '/vdoTv/:id',
        element: <VdoTv />
      },

      {
        path: '/tv/:id/cast&crew',
        element: <CastCrewTv />
      },
      {
        path: '/tv-details/:id',
        element: <TvDetails />,
      },
      {
        path: '/movie-details/:id',
        element: <MovieDetails />
      },

      {
        path: '/footer',
        element: <Footer />
      },

      {
        path: '/alternative/:id/title',
        element: <ProgressRounded />
      },
      {
        path: '/genre/:genre_id',
        element: <GenresType />
      },
      {
        path: '/genre/:genre_id/tv',
        element: <GenreTvType />
      },
      {
        path: '/movie/:id/cast&crew',
        element: <CastCrew />
      },
      {
        path: '/acting-movies',
        element: <ActingMV />
      },
      {
        path: '/acting-tv-shows',
        element: <ActingTV />
      },
     
      
    ],

    errorElement: <PathError />,

  },
  {
    path: '/log-in',
    element: <LogIn />
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
