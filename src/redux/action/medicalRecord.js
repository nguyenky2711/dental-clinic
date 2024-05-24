import { createAsyncThunk } from '@reduxjs/toolkit';
import medicalRecord from '../api/medicalRecord';
const {
    getProceduredByRecorId,
    create,
    getRecordByPatientId
} = medicalRecord;


export const getProceduredByRecorIdThunk = createAsyncThunk(
    'medicalRecord/getProceduredByRecorId',
    async (data) => {
        try {
            const res = await getProceduredByRecorId(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const createMedicalRecordThunk = createAsyncThunk(
    'medicalRecord/createMedicalRecord',
    async (data) => {
        try {
            const res = await create(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const getRecordByPatientIdThunk = createAsyncThunk(
    'medicalRecord/getRecordByPatientId',
    async (data) => {
        try {
            const res = await getRecordByPatientId(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
