import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieDetails } from "./movieAction";


export const movieSlice = createSlice({
     
     name: 'movie',
     initialState: {
          data: {},
          status: "",
          error: {},
          details: {},
     },
     
     reducers: {},
     extraReducers(builder) {
          builder
               
               .addCase(fetchMovies.pending, (state, action) => {
                    // TODO
                    state.status = "PENDING";
               })
               
               .addCase(fetchMovies.fulfilled, (state, action) => {
                    // TODO
                    // console.log('payload ', action.payload)
                    state.status = "SUCCEED";
                    state.data = action.payload; // Payload From API
               })
               
               .addCase(fetchMovies.rejected, (state, action) => {
                    // TODO
                    // console.log(action.error)
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
               
     
     }
})

export default movieSlice.reducer;