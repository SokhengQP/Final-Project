import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router';
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
import PopularPeople from './components/popular-people/PopularPeople'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MasterLayout />,
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
        element: <NowPlaying />
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
        path: '/popular-people',
        element: <PopularPeople />
      },
      {
        path: '/movie-details/:id',
        element: <MovieDetails />
      },
    ],
    
    errorElement: {
      path: '/path-error',
      element: <PathError />
    }
    
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
