import {
    createAsyncThunk
} from "@reduxjs/toolkit";
const keys = `995b46c34578880175b2df0cb63164cd`;


// TV SERIES LISTS - Popular
export const fetchPopularTv = createAsyncThunk('/my-popular/fetchPopularTv/',
    async (page) => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${keys}&page=${page}`);
            let data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


// TV SERIES LISTS - Airing Today
export const fetchAiringTv = createAsyncThunk('/my-airTv/fetchAirTv/',
    async (page) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${keys}&page=${page}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


// TV SERIES LISTS - On The Air
export const fetchOnTv = createAsyncThunk('/my-OnAir/fetchOnAirTv/',
    async (page) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${keys}&page=${page}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


// TV SERIES LISTS - Top Rated
export const fetchTopRatedTv = createAsyncThunk('/my-TopRated/fetchOnAirTv/',
    async (page) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${keys}&page=${page}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


// Tv Video - Details
export const fetchMoviesTv = createAsyncThunk('/my-details/fetchMoviesTv/',
    async (id) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${keys}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

// tv seasons
export const fetchTvEpisode = createAsyncThunk(
    'tv-season/details-seasons',
    async ({
        id,
        season_number
    }, {
        rejectWithValue
    }) => { // Keep id to match route
        try {
            if (!id || !season_number) {
                throw new Error('Missing ID or season number');
            }

            const response = await fetch(
                `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${keys}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Add await here
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch TV episodes');
        }
    }
);