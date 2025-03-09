import { createAsyncThunk } from "@reduxjs/toolkit";

const keys = `995b46c34578880175b2df0cb63164cd`;

// TV SERIES LISTS - Popular
export const fetchPopularTv = createAsyncThunk('/my-popular/fetchPopularTv/',
    async () => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${keys}`);
            let data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


// TV SERIES LISTS - Airing Today
export const fetchAirTv = createAsyncThunk('/my-airTv/fetchAirTv/',
    async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${keys}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


// TV SERIES LISTS - On The Air
export const fetchOnAirTv = createAsyncThunk('/my-OnAir/fetchOnAirTv/',
    async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${keys}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


// TV SERIES LISTS - Top Rated
export const fetchTopRatedTv = createAsyncThunk('/my-TopRated/fetchOnAirTv/',
    async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${keys}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);