import {
    createAsyncThunk
} from "@reduxjs/toolkit";
const keys = import.meta.env.VITE_API_KEY;


// TV SERIES LISTS - Popular
export const fetchPopularTv = createAsyncThunk('/popular-tvshows/fetchPopularTv/',
    async (page = 1, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${keys}&page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
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
            // Validate inputs
            if (!id || season_number === undefined || season_number === null) {
                throw new Error('Missing ID or season number');
            }

            // Ensure season_number is an integer (TMDB accepts 0 for specials)
            const seasonNum = parseInt(season_number, 10);
            if (isNaN(seasonNum)) {
                throw new Error(`Invalid season number: ${season_number}`);
            }

            const url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=${keys}`;
            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }

            const data = await response.json();

            // Check if we got meaningful data
            if (!data.episodes) {
                console.warn(`No episodes returned for season ${seasonNum}`);
            }

            return data;
        } catch (error) {
            console.error(`Fetch failed for TV ${id}, season ${season_number}:`, error);
            return rejectWithValue(error.message || 'Failed to fetch TV episodes');
        }
    }
);