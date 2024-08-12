import { createAsyncThunk } from '@reduxjs/toolkit';
import patient from '../api/patient';
const {
    create,
    filter,
    getPatientByToken,
    update,
} = patient;


export const filterPatientThunk = createAsyncThunk(
    'patient/filterPatient',
    async (data) => {
        try {
            const res = await filter(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const getPatientByTokenThunk = createAsyncThunk(
    'patient/getPatientByToken',
    async (data) => {
        try {
            const res = await getPatientByToken(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);

export const createPatientThunk = createAsyncThunk(
    'patient/createPatient',
    async (data) => {
        try {
            const res = await create(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const updatePatientThunk = createAsyncThunk(
    'patient/updatePatient',
    async (data) => {
        try {
            const res = await update(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
