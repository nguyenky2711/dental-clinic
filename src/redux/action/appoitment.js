import { createAsyncThunk } from '@reduxjs/toolkit';
import appointment from '../api/appointment';
const {
    confirm,
    decline,
    createByClient,
    createByStaff,
    filter,
} = appointment;


export const createAppointmentByClientThunk = createAsyncThunk(
    'appointment/createByClient',
    async (data) => {
        try {
            const res = await createByClient(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const createAppointmentByStaffThunk = createAsyncThunk(
    'appointment/createByStaff',
    async (data) => {
        try {
            const res = await createByStaff(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const confirmAppointmentThunk = createAsyncThunk(
    'appointment/confirm',
    async (data) => {
        try {
            const res = await confirm(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const declineAppointmentThunk = createAsyncThunk(
    'appointment/decline',
    async (data) => {
        try {
            const res = await decline(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const filterAppointmentThunk = createAsyncThunk(
    'appointment/filter',
    async (data) => {
        try {
            const res = await filter(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
