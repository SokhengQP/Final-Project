import {
    createSlice
} from "@reduxjs/toolkit";
import {
    fetchPopularPeople,
    fetchPersonDetail,
    fetchCombinedCredit,
    fetchExternalId,
    fetchCreditMovie,
    fetchSearchPeople
} from "./peopleAction";

export const peopleSlice = createSlice({
    name: 'people',
    initialState: {
        popularPerson: {},
        searchResults: {},
        personDetail: {},
        combinedCredit: {},
        external: {},
        creditMV: {},
        page: 1,
        loading: false,
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
            .addCase(fetchPopularPeople.pending, (state) => {
                state.status = 'Pending';
            })
            // fetchAirTv
            .addCase(fetchPopularPeople.fulfilled, (state, action) => {
                state.status = 'SUCCEED';
                state.popularPerson = action.payload;
            })
            .addCase(fetchSearchPeople.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.loading = false;
            })

            .addCase(fetchPopularPeople.rejected, (state, action) => {
                state.status = 'Errror';
                state.popularPerson = action.error;
            })


            // person Detail
            .addCase(fetchPersonDetail.fulfilled, (state, action) => {
                state.personDetail = action.payload;
            })

            // person combined credits
            .addCase(fetchCombinedCredit.fulfilled, (state, action) => {
                state.combinedCredit = action.payload;
            })

            // person external IDs
            .addCase(fetchExternalId.fulfilled, (state, action) => {
                state.external = action.payload;
            })

            .addCase(fetchCreditMovie.fulfilled, (state, action) => {
                state.creditMV = action.payload;
            })

    }
})

export default peopleSlice.reducer;
export const {
    setPage
} = peopleSlice.actions;