import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../api/auth';
const {
    login,
} = auth;


export const loginThunk = createAsyncThunk(
    'auth/login',
    async (data) => {
        try {
            const res = await login(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
