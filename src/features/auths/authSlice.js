import {
    createSlice
} from "@reduxjs/toolkit";
import {
    signUp,
    getProfile
} from "./authAction";


const authSlice = createSlice({
    name: 'authSignIn',
    initialState: {
        isAuthenticated: false,
        profile: {},
        accessToken: null,
        loading: false,
        error: null,
        profile: {},
    },

    reducers: {
        setLogin: (state, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.profile = action.payload.profile;
            state.loading = false;
            state.error = null;
        },

        setLoggedout: (state, action) => {
            state.isAuthenticated = false;
            state.profile = null;
            state.accessToken = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('accessToken');
        },
    },

    extraReducers(builder) {
        builder
            .addCase(signUp.pending, (state, action) => {
                state.isAuthenticated = false;
            })

            .addCase(signUp.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.accessToken = action.payload.access_token;

            })
            .addCase(signUp.rejected, (state, action) => {
                state.isAuthenticated = false;
                console.log(action.error);
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profile = action.payload;

            })



    }
})

export const {
    setLogin,
    setLoggedout
} = authSlice.actions;
export default authSlice.reducer