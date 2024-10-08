import { createAsyncThunk } from '@reduxjs/toolkit';
import medicalRecord from '../api/medicalRecord';
const {
    getProceduredByRecordId,
    getProceduredByVisitdId,
    create,
    deleteRecord,
    getRecordByPatientId,
    getRecordByToken,
    addProcedureForRecord,
    addProceduredByVisitdId,
    deleteProcedureById,
    updateProcedureById,
    addVisitForRecord,
    deleteVisitById,
    getVisitByRecordId,
    exportVisitToPDF,
    doneRecord,
    reopenRecord,
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
export const deleteMedicalRecordThunk = createAsyncThunk(
    'medicalRecord/deleteMedicalRecord',
    async (data) => {
        try {
            const res = await deleteRecord(data);
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
export const getRecordByTokenThunk = createAsyncThunk(
    'medicalRecord/getRecordByToken',
    async (data) => {
        try {
            const res = await getRecordByToken(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);


export const getProceduredByVisitIdThunk = createAsyncThunk(
    'medicalRecord/getProceduredByVisitId',
    async (data) => {
        try {
            const res = await getProceduredByVisitdId(data);
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
            const res = await getProceduredByRecordId(data);
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
export const addProceduredByVisitdIdThunk = createAsyncThunk(
    'medicalRecord/addProceduredByVisitdId',
    async (data) => {
        try {
            const res = await addProceduredByVisitdId(data);
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
export const updateProcedureByIdThunk = createAsyncThunk(
    'medicalRecord/updateProcedureById',
    async (data) => {
        try {
            const res = await updateProcedureById(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);

export const addVisitForRecordThunk = createAsyncThunk(
    'medicalRecord/addVisitForRecord',
    async (data) => {
        try {
            const res = await addVisitForRecord(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const deleteVisitByIdThunk = createAsyncThunk(
    'medicalRecord/deleteVisitById',
    async (data) => {
        try {
            const res = await deleteVisitById(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const exportVisitToPDFThunk = createAsyncThunk(
    'medicalRecord/exportVisitToPDF',
    async (data) => {
        try {
            const res = await exportVisitToPDF(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const getVisitByRecordIdThunk = createAsyncThunk(
    'medicalRecord/getVisitByRecordId',
    async (data) => {
        try {
            const res = await getVisitByRecordId(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const doneRecordThunk = createAsyncThunk(
    'medicalRecord/doneRecord',
    async (data) => {
        try {
            const res = await doneRecord(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const reopenRecordThunk = createAsyncThunk(
    'medicalRecord/reopenRecord',
    async (data) => {
        try {
            const res = await reopenRecord(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);