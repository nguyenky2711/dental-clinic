import { createAsyncThunk } from '@reduxjs/toolkit';
import workingTime from '../api/workingTime';
const {
    create,
    showForStaffByWeek,
    deleteWorkingTime,
} = workingTime;


export const createWorkingTimeThunk = createAsyncThunk(
    'workingTime/create',
    async (data) => {
        try {
            const res = await create(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const showForStaffByWeekThunk = createAsyncThunk(
    'workingTime/showForStaffByWeek',
    async (data) => {
        try {
            const res = await showForStaffByWeek(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const deleteWorkingTimeThunk = createAsyncThunk(
    'workingTime/deleteWorkingTime',
    async (data) => {
        try {
            const res = await deleteWorkingTime(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
