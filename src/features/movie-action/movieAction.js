import { createAsyncThunk } from "@reduxjs/toolkit";
const url = `995b46c34578880175b2df0cb63164cd`;
import Loading from "../../styles/Loading";

// Discover Movie
export const fetchDiscover = createAsyncThunk('/movie/fetchDiscover/',
     async (page = 1) => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${url}&page=${page}`);
               const datas = await response.json();
               return datas
          } catch (error) {
               return Promise.reject(error)
          }
     }
)

// Discover Tv By Genre_ids
export const fetchDiscoverTv = createAsyncThunk('/tv/fetchDiscoverTv/',
     async ({
          genreId,
          page
     }) => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&api_key=${url}&page=${page}`);
               const datas = await response.json();
               return datas
          } catch (error) {
               return Promise.reject(error)
          }
     }
)


// Discover By Genre_ids
export const fetchDiscoverByGenre = createAsyncThunk('/movie/fetchDiscoverByGenre/',
     async ({
          genreId,
          page
     }) => {
          try {
               let response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${url}&page=${page}`);
               const datas = await response.json();
               return datas;
          } catch (error) {
               return Promise.reject(error)
          }
     }
)

// Movie - Credit (Cast)
export const fetchTopBilledCast = createAsyncThunk('/movie/fetchTopBilledCast/',
     async (id) => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${url}`);
               const datas = await response.json();
               return datas
          } catch (error) {
               return Promise.reject(error)
          }
     }
)


// Tv - Credit (Cast)
export const fetchCreditTv = createAsyncThunk('/tv/fetchCreditTv/',
     async (id) => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${url}`);
               const datas = await response.json();
               return datas
          } catch (error) {
               return Promise.reject(error)
          }
     }
)


// Top rate movie
export const fetchMovieTopRate = createAsyncThunk('/movie/fetchMovieTopRate/',
     async (page) => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${url}&page=${page}`);
               const datas = await response.json();
               return datas
          } catch (error) {
               return Promise.reject(error)
          }
     }
)

// Upcomming
export const fetchUpcomming = createAsyncThunk('/movie/fetchUpcomming/',
     async (page = 1) => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${url}&page=${page}`);
               const datas = await response.json();
               return datas
          } catch (error) {
               return Promise.reject(error)
          }
     }
)


// Trending All
export const fetchMovies = createAsyncThunk('/movie/fetchMovie/',
     async ({ timeWindow, page = 1 }) => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${url}&page=${page}`);
               const datas = await response.json();
               return datas;
          } catch (error) {
               return Promise.reject(error)
          }
     }
)

// Trending all day
export const fetchTrendingDay = createAsyncThunk('/movie/fetchMovie/',
     async () => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${url}`);
               const datas = await response.json();
               return datas
          } catch (error) {
               return Promise.reject(error)
          }
     }
)

// tv-detials
export const fetchTv = createAsyncThunk('/movie/fetchTv/',
     async (id) => {
          try {
               let response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${url}`);
               let datas = await response.json();
               return datas;
          } catch (error) {
               return Promise.reject(error)
          }

     }
)


// movie-detials / video
export const fetchMoviesVideo = createAsyncThunk('/product/fetchMoviesVidoe/',
     async (id) => {
          try {
               let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${url}`);
               const respData = response.json();
               return respData;
          } catch (error) {
               return Promise.reject(error);
          }
     }
)

// tv-detials / video
export const fetchTvVideo = createAsyncThunk('/product/fetchTvVideo/',
     async (id) => {
          try {
               let response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${url}`);
               const respData = response.json();
               return respData;
          } catch (error) {
               return Promise.reject(error);
          }
     }
)
// Details -- release_dates
export const fetchMoviesReleaseDate = createAsyncThunk('/product/fetchfetchMoviesReleaseDate/',
     async (id) => {
          try {
               let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${url}`);
               const respData = response.json();
               return respData;
          } catch (error) {
               return Promise.reject(error);
          }
     }
)


// Now Playing page
export const fetchNowPlayingPage = createAsyncThunk('/product/fetchNowPlayingPage/',
     async (pages = 1) => {
          try {
               let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${url}&page=${pages}`);
               let respData = response.json();
               return respData;
          } catch (error) {
               return Promise.reject(error);
          }
     }
);


// Popular
export const fetchPopular = createAsyncThunk('/product/fetchPopular/',
     async (pages = 1, { rejectWithValue }) => {
          let spinnerTime = null;
          try {
               const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${url}&&page=${pages}`);
               if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
               }
               const respData = response.json();
               return respData;
          }

          catch (error) {
               return rejectWithValue(error.message);
          }

          finally {
               if (spinnerTime) {
                    clearTimeout(spinnerTime);
               }
          }


     }
)


// Movie Details
export const fetchMovieDetails = createAsyncThunk('/product/fetchDetails/',
     async (id) => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${url}`);
               const respData = response.json();
               return respData;
          } catch (error) {
               return Promise.reject(error);
          }
     }
)



// For Sonic the Hedgehog 3
export const fetchSearchMovie = createAsyncThunk('/product/fetchSearchMovie/',
     async () => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/movie/939243/videos?api_key=${url}`);
               const respData = response.json();
               return respData;
          } catch (error) {
               return Promise.reject(error);
          }
     }
)


export const fetchTopRated = createAsyncThunk('/product/fetchTopRated/',
     async () => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${url}`);
               const respData = response.json();
               return respData;
          } catch (error) {
               return Promise.reject(error);
          }
     }
);




// Genre - Movie List
export const fetchGenreMovie = createAsyncThunk('/product/fetchGenreMovie/',
     async () => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${url}`);
               const respData = response.json();
               return respData;
          } catch (error) {
               return Promise.reject(error);
          }
     }
);

// Genre - Tv List
export const fetchGenreTv = createAsyncThunk('/product/fetchGenreTv/',
     async () => {
          try {
               const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${url}`);
               const respData = response.json();
               return respData;
          } catch (error) {
               return Promise.reject(error);
          }
     }
);

