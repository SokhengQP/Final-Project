import {
     createSlice
} from '@reduxjs/toolkit';

import {
     fetchMovies,
     fetchPopular,
     fetchNowPlayingPage,
     fetchDiscover,
     fetchMovieDetails,
     fetchTv,
     // fetchNowPlaying,
     fetchMoviesReleaseDate,
     fetchMovieTopRate,
     fetchUpcomming,
     fetchMoviesVideo,
     fetchGenreMovie,
     fetchGenreTv,
     fetchDiscoverByGenre,
     fetchTopBilledCast,
     fetchCreditTv,
     fetchDiscoverTv,
} from "./movieAction";


export const movieSlice = createSlice({
     name: 'movie',
     initialState: {
          discover: {},
          discoverByGenre: {},
          movieTopRate: {},
          upcomming: {},
          data: {},
          detailsVideo: {},
          popular: {},
          details: {},
          movieplayingPage: {},
          tvs: {},
          detailReleaseDate: {},
          genreMovie: {},
          genreTv: {},
          creditMovie: {},
          castTv: {},
          discoverTv: {},
          page: 1,
          moreCrew: 8,
          error: {},
          loading: false,
          status: "",

     },

     reducers: {
          setPage: (state, action) => {
               state.page = action.payload;
          },

          setMore: (state, action) => {
               state.moreCrew = action.payload;
          }

     },

     extraReducers(builder) {
          builder

               .addCase(fetchDiscover.fulfilled, (state, action) => {
                    state.status = 'SUCCEED';
                    state.discover = action.payload;
               })

               .addCase(fetchMovieTopRate.fulfilled, (state, action) => {
                    // TODO
                    state.status = "SUCCEED";
                    state.movieTopRate = action.payload;
               })

               .addCase(fetchMoviesVideo.fulfilled, (state, action) => {
                    // TODO
                    state.status = "SUCCEED";
                    state.detailsVideo = action.payload;
               })

               .addCase(fetchUpcomming.fulfilled, (state, action) => {
                    // TODO
                    state.status = "SUCCEED";
                    state.upcomming = action.payload;
               })

               .addCase(fetchMovies.pending, (state, action) => {
                    // TODO
                    state.status = "PENDING";
               })

               .addCase(fetchMovies.fulfilled, (state, action) => {
                    // TODO
                    state.status = "SUCCEED";
                    state.data = action.payload;
               })

               .addCase(fetchMoviesReleaseDate.fulfilled, (state, action) => {
                    // TODO
                    state.detailReleaseDate = action.payload;
               })


               .addCase(fetchTv.fulfilled, (state, action) => {
                    state.status = "SUCCEED";
                    state.tvs = action.payload;
               })
               .addCase(fetchPopular.pending, (state, action) => {
                    // TODO
                    state.loading = true;
               })
               .addCase(fetchPopular.fulfilled, (state, action) => {
                    // TODO
                    state.status = "SUCCEED";
                    state.popular = action.payload;
               })
               .addCase(fetchPopular.rejected, (state, action) => {
                    // TODO
                    state.loading = false;
               })

               .addCase(fetchMovies.rejected, (state, action) => {
                    // TODO
                    state.status = "ERROR";
                    state.error = action.error;
               })


               // fetchMovieDetails
               .addCase(fetchMovieDetails.pending, (state, action) => {
                    state.status = 'Pending';
               })

               .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                    state.status = 'SUCCEED';
                    state.details = action.payload;

               })

               .addCase(fetchMovieDetails.rejected, (state, action) => {
                    state.status = 'Errror';
                    state.error = action.error;

               })

               // .addCase(fetchNowPlaying.fulfilled, (state, action) => {
               //      state.status = 'SUCCEED';
               //      state.movieplaying = action.payload;

               // })

               .addCase(fetchNowPlayingPage.fulfilled, (state, action) => {
                    state.status = 'SUCCEED';
                    state.movieplayingPage = action.payload;

               })


               .addCase(fetchGenreMovie.fulfilled, (state, action) => {
                    state.genreMovie = action.payload;
               })

               .addCase(fetchGenreTv.fulfilled, (state, action) => {
                    state.genreTv = action.payload;
               })

               .addCase(fetchDiscoverByGenre.fulfilled, (state, action) => {
                    state.discoverByGenre = action.payload;
               })

               .addCase(fetchTopBilledCast.fulfilled, (state, action) => {
                    state.creditMovie = action.payload;
               })


               .addCase(fetchCreditTv.fulfilled, (state, action) => {
                    state.creditTv = action.payload;
               })


               .addCase(fetchDiscoverTv.fulfilled, (state, action) => {
                    state.discoverTv = action.payload;
               })

     }
})


export default movieSlice.reducer;
export const {
     setPage, setMore
} = movieSlice.actions;