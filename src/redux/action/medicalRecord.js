import { createAsyncThunk } from '@reduxjs/toolkit';
import medicalRecord from '../api/medicalRecord';
const {
    getProceduredByRecorId,
    create,
    getRecordByPatientId,
    addProcedureForRecord,
    deleteProcedureById,
} = medicalRecord;



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
export const addProcedureForRecordThunk = createAsyncThunk(
    'medicalRecord/addProcedureForRecord',
    async (data) => {
        try {
            const res = await addProcedureForRecord(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const deleteProcedureByIdThunk = createAsyncThunk(
    'medicalRecord/deleteProcedureById',
    async (data) => {
        try {
            const res = await deleteProcedureById(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);