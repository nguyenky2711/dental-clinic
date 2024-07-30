import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../api/auth';
const {
    login,
    confirmWithOTP,
    sendActiveMail,
    changePasssword,
    confirmMail,
    confirmResetPasswordOTP,
    changePassswordWhenForgot,
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
export const changePassswordThunk = createAsyncThunk(
    'auth/changePasssword',
    async (data) => {
        try {
            const res = await changePasssword(data);
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
export const confirmMailThunk = createAsyncThunk(
    'auth/confirmMail',
    async (data) => {
        try {
            console.log(data)
            const res = await confirmMail(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);

export const confirmResetPasswordOTPThunk = createAsyncThunk(
    'auth/confirmResetPasswordOTP',
    async (data) => {
        try {
            const res = await confirmResetPasswordOTP(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);

export const changePassswordWhenForgotThunk = createAsyncThunk(
    'auth/changePassswordWhenForgot',
    async (data) => {
        try {
            const res = await changePassswordWhenForgot(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);