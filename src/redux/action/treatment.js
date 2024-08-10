import { createAsyncThunk } from '@reduxjs/toolkit';
import treatment from '../api/treatment';
const {
    filterTreatments,
    createTreatment,
    updateTreatment,
    deleteTreatment,
    getServices,
    createService,
    updateService,
    deleteService,
} = treatment;


export const getServicesMedicalThunk = createAsyncThunk(
    'treatment/service/getServices',
    async (data) => {
        try {
            const res = await getServices(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const createServiceMedicalThunk = createAsyncThunk(
    'treatment/service/createService',
    async (data) => {
        try {
            const res = await createService(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const updateServiceMedicalThunk = createAsyncThunk(
    'treatment/service/updateService',
    async (data) => {
        try {
            const res = await updateService(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const deleteServiceMedicalThunk = createAsyncThunk(
    'treatment/service/deleteService',
    async (data) => {
        try {
            const res = await deleteService(data);
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
export const createTreatmentThunk = createAsyncThunk(
    'treatment/createTreatment',
    async (data) => {
        try {
            const res = await createTreatment(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const updateTreatmentThunk = createAsyncThunk(
    'treatment/updateTreatment',
    async (data) => {
        try {
            const res = await updateTreatment(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const deleteTreatmentThunk = createAsyncThunk(
    'treatment/deleteTreatment',
    async (data) => {
        try {
            const res = await deleteTreatment(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
