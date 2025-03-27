// src/store/searchSlice.js
import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';

const API_KEY = `995b46c34578880175b2df0cb63164cd`;


// AsyncThunk - Fetch from TMDB
export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (query, {
    rejectWithValue
}) => {
    try {
        // Wrap the fetch call in a Promise with setTimeout
        const response = await new Promise((resolve) => {
            setTimeout(async () => {
                const fetchResponse = await fetch(
                    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
                );
                resolve(fetchResponse);
            }, 2000); // Delay of 2000ms (2 seconds)
        });

        if (!response.ok) throw new Error('Failed to fetch search results');
        const data = await response.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// Slice - Handles loading, success, error
const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        loading: false,
        error: null,
    },
    reducers: {}, 

    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default searchSlice.reducer;