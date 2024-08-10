import { createAsyncThunk } from '@reduxjs/toolkit';
import queue from '../api/queue';
const {
    addPatientToQueue,
    getNextByStaffId,
    getQueueByStaffId
} = queue;


export const addPatientToQueueThunk = createAsyncThunk(
    'queue/addPatientToQueue',
    async (data) => {
        try {
            const res = await addPatientToQueue(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const getNextByStaffIdThunk = createAsyncThunk(
    'queue/getNextByStaffId',
    async (data) => {
        try {
            const res = await getNextByStaffId(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const getQueueByStaffIdThunk = createAsyncThunk(
    'queue/getQueueByStaffId',
    async (data) => {
        try {
            const res = await getQueueByStaffId(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
