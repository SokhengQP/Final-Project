import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;

import {
    createAsyncThunk
} from "@reduxjs/toolkit";

export const favAct = createAsyncThunk(
    'favorites/fetchMovies',
    async (page = 1, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air`, {
                params: {
                    api_key: API_KEY,
                    page: page,
                },
            });
            return response.data.results;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

