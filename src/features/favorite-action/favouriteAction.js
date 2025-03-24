import axios from 'axios';
const API_KEY = `995b46c34578880175b2df0cb63164cd`;

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

