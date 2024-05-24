import { createAsyncThunk } from '@reduxjs/toolkit';
import treatment from '../api/treatment';
const {
    filterTreatments,
    getServices
} = treatment;


export const getServicesMedicalThunk = createAsyncThunk(
    'treatment/getServices',
    async (data) => {
        try {
            const res = await getServices(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const filterTreatmentsThunk = createAsyncThunk(
    'treatment/filterTreatments',
    async (data) => {
        try {
            const res = await filterTreatments(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
