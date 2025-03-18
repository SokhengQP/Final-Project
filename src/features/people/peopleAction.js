import {
    createAsyncThunk
} from "@reduxjs/toolkit";


const keys = `995b46c34578880175b2df0cb63164cd`;

export const fetchPopularPeople = createAsyncThunk('/people/fetchPeoplePopular/',
    async (page = 1) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${keys}&page=${page}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


export const fetchPersonDetail = createAsyncThunk('/detail/fetchPersonDetail/',
    async (id) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${keys}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

// combined credits
export const fetchCombinedCredit = createAsyncThunk('/credits/fetchCombinedCredit/',
    async (person_id) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/person/${person_id}/combined_credits?api_key=${keys}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

// External IDs
export const fetchExternalId = createAsyncThunk('/external-credits/fetchExternalId/',
    async (person_id) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/person/${person_id}/external_ids?api_key=${keys}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


// External IDs
export const fetchCreditMovie = createAsyncThunk('/creditsMV/fetchCreditMovie/',
    async (person_id) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${keys}`);
            const data = response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);