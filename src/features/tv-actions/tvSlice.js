import {
    createSlice
} from "@reduxjs/toolkit";


import {
    fetchAirTv,
    fetchPopularTv,
    fetchTopRatedTv,
    fetchOnAirTv,
} from "./tvAction";


const tvSlice = createSlice({
    name: 'myTvs',
    initialState: {
        airTv: {},
        popularTv: {},
        topRatedTv: {},
        onAirTv: {},
        page: 1,
    },

    reducer: {
        setPage: (state, action) => {
            // state.page += 1;
            state.page = action.payload;
        }
    },

    extraReducer(builder) {
        builder

            // fetchAirTv
            .addCase(fetchAirTv.fulfilled, (state, action) => {
                state.airTv = action.payload;
            })

            // fetchPopularTv
            .addCase(fetchPopularTv.fulfilled, (state, action) => {
                state.popularTv = action.payload;
            })

            // fetchTopRatedTv
            .addCase(fetchTopRatedTv.fulfilled, (state, action) => {
                state.topRatedTv = action.payload;
            })

            // fetchOnAirTv
            .addCase(fetchOnAirTv.fulfilled, (state, action) => {
                state.onAirTv = action.payload;
            })
    }
})

export default tvSlice.reducer;
export const {
    setPage
} = tvSlice.actions;