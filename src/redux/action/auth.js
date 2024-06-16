import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../api/auth';
const {
    login,
    confirmWithOTP,
    sendActiveMail,
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
export const sendActiveMailThunk = createAsyncThunk(
    'auth/sendActiveMail',
    async (data) => {
        try {
            const res = await sendActiveMail(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const confirmWithOTPThunk = createAsyncThunk(
    'auth/confirmWithOTP',
    async (data) => {
        try {
            const res = await confirmWithOTP(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
