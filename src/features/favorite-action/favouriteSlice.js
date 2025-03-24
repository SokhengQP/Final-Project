import {
    createSlice
} from "@reduxjs/toolkit";
import {
    favAct,
} from "./favouriteAction";

const favouriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        movies: [],
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        status: 'idle',
        error: null,
    },

    reducers: {
        addToFavorites: (state, action) => {
            const movie = action.payload;
            const favoriteMovie = {
                id: movie.id,
                title: movie.original_title || movie.name || 'Untitled',
                overview: movie.overview || 'No overview available',
                poster_path: movie.poster_path || '',
                media_type: movie.media_type || 'Unknown'
            };

            if (!state.favorites.some(fav => fav.id === movie.id)) {
                state.favorites.push(favoriteMovie);
                try {
                    localStorage.setItem('favorites', JSON.stringify(state.favorites));

                } catch {
                    console.error('Error saving favorites to localStorage:', err);
                }
            }
        },

        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(movie => movie.id !== action.payload);
            try {

                localStorage.setItem('favorites', JSON.stringify(state.favorites));
            } catch {

                console.error('Error saving favorites to localStorage:', err);
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(favAct.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(favAct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })

            .addCase(favAct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {
    addToFavorites,
    removeFromFavorites
} = favouriteSlice.actions;
export default favouriteSlice.reducer;