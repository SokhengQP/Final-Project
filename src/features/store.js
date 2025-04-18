import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movie-action/movieSlice';
import searchReducer from '../features/search/fetchSearchResults';
import myTvsReducer from '../features/tv-actions/tvSlice';
import peopleReducer from '../features/people/peopleSlice';
import favoriteReducer from '../features/favorite-action/favouriteSlice';
import authReducer from '../features/auths/authSlice';

export const store = configureStore({
     reducer: {
          movie: movieReducer,
          search: searchReducer,
          myTvs: myTvsReducer,
          people: peopleReducer,
          favorites: favoriteReducer,
          authSignIn: authReducer,
     }
})