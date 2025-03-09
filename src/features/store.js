import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counterSlice';
import movieReducer from './movie-action/movieSlice';
import searchReducer from '../features/search/fetchSearchResults';
import tvReducer from '../features/tv-actions/tvSlice';

export const store = configureStore({
     reducer: {
          counter: counterReducer,
          movie: movieReducer,
          search: searchReducer,
          myTvs: tvReducer,
     }
})
