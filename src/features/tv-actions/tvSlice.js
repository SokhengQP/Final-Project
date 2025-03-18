import {
    createSlice
} from "@reduxjs/toolkit";


import {
    fetchAiringTv,
    fetchPopularTv,
    fetchTopRatedTv,
    fetchOnTv,
    fetchMoviesTv,
} from "./tvAction";


export const tvSlice = createSlice({
    name: 'myTvs',
    initialState: {
        popularTv: {},
        airTv: {},
        onTv: {},
        topRatedTv: {},

        page: 1,
        status: '',
        error: null
    },

    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },

    extraReducers(builder) {
        
        builder
            // fetchAirTv
            .addCase(fetchAiringTv.fulfilled, (state, action) => {
                state.airTv = action.payload;
            })

            // fetchPopularTv
            .addCase(fetchPopularTv.pending, (state, action) => {
                state.status = 'Pending';
            })
            .addCase(fetchPopularTv.fulfilled, (state, action) => {
                state.popularTv = action.payload;
            })
            .addCase(fetchPopularTv.rejected, (state, action) => {
                state.status = 'Errror';
                state.popularTv = action.error;

            })

            // fetchTopRatedTv
            .addCase(fetchTopRatedTv.fulfilled, (state, action) => {
                state.topRatedTv = action.payload;
            })

            // fetchOnAirTv
            .addCase(fetchOnTv.fulfilled, (state, action) => {
                state.onTv = action.payload;
            })

            // fetchMoviesTv
            .addCase(fetchMoviesTv.fulfilled, (state, action) => {
                state.videoTv = action.payload;
            })

            

    }
})

export default tvSlice.reducer;
export const {
    setPage
} = tvSlice.actions;