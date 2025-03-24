import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {
    setLoggedout
} from "./authSlice";

export const signUp = createAsyncThunk('/auth/login-page',
    async (data) => {
        try {
            const sign_in = await fetch(`https://api.escuelajs.co/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'Application/json'
                },
                body: JSON.stringify(data),
            })

            const response = await sign_in.json();

            if (response.status === '401') {
                return Promise.reject(error)
            }
            return response;
        } catch (error) {
            return Promise.reject(error)
        }
    }
)


export const getProfile = createAsyncThunk('/auth/getProfile',
    async (accessToken) => {
        try {
            const personalProfile = await fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${accessToken}`
                },
            })

            if (personalProfile.status === '401') {
                return Promise.reject(error)
            }

            return personalProfile.json();
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

export const logout = () => (dispatch) => {
    dispatch(setLoggedout());
};