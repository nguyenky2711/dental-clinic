import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../action/auth";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        clearAuth: (state) => {
            state.login.currentUser = null;
            state.login.isFetching = false;
            state.login.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            loginThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.login.currentUser = payload;
                }
            }
        );
    },
})
export const {
    clearAuth
} = authSlice.actions;
export default authSlice.reducer