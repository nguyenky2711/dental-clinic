import { createAsyncThunk } from '@reduxjs/toolkit';
import patient from '../api/patient';
const {
    create,
    filter
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
