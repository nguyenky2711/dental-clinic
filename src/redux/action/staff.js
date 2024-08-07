import { createAsyncThunk } from '@reduxjs/toolkit';
import staff from '../api/staff';
const {
    create,
    filter,
    filterForPatient,
    update,
    getStaffByToken,
} = staff;


export const filterStaffThunk = createAsyncThunk(
    'staff/filterStaff',
    async (data) => {
        try {
            const res = await filter(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const filterStaffForPatientThunk = createAsyncThunk(
    'staff/filterForPatient',
    async (data) => {
        try {
            const res = await filterForPatient(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);

export const createStaffThunk = createAsyncThunk(
    'staff/createStaff',
    async (data) => {
        try {
            const res = await create(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const updateStaffThunk = createAsyncThunk(
    'staff/updateStaff',
    async (data) => {
        try {
            const res = await update(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const getStaffByTokenThunk = createAsyncThunk(
    'staff/getStaffByToken',
    async (data) => {
        try {
            const res = await getStaffByToken(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
