import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk('/movie/fetch',
     async () => {
          try {
               let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=995b46c34578880175b2df0cb63164cd`);
               let datas = await response.json();
               return datas;     
          }
          
          catch (error) {
               return Promise.reject(error)
          }
     }
)


export const fetchMovieDetails = createAsyncThunk('/product/fetchDetails/',
     async (movie_id) => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=995b46c34578880175b2df0cb63164cd`);
               const respData =  response.json();
               return respData;
          }
          
          catch (error) {
               return Promise.reject(error);
          }
     }
)





// For Sonic the Hedgehog 3
export const fetchSearchMovie = createAsyncThunk('/product/fetchSearchMovie/',
     async () => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/movie/939243/videos?api_key=995b46c34578880175b2df0cb63164cd`);
               const respData = response.json();
               return respData;
          }
          
          catch (error) {
               return Promise.reject(error);
          }
     }
)


