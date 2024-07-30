import { createAsyncThunk } from '@reduxjs/toolkit';
import revenue from '../api/revenue';
const {
    createInvoice,
    findInvoiceByVisitId,
    getRevenueByWeek,
    getRevenueByMonth,
    getRevenueByYear,
} = revenue;


export const createInvoiceThunk = createAsyncThunk(
    'revenue/createInvoice',
    async (data) => {
        try {
            const res = await createInvoice(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const findInvoiceByVisitIdThunk = createAsyncThunk(
    'revenue/findInvoiceByVisitId',
    async (data) => {
        try {
            const res = await findInvoiceByVisitId(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const getRevenueByWeekThunk = createAsyncThunk(
    'revenue/getRevenueByWeek',
    async (data) => {
        try {
            const res = await getRevenueByWeek(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const getRevenueByMonthThunk = createAsyncThunk(
    'revenue/getRevenueByMonth',
    async (data) => {
        try {
            const res = await getRevenueByMonth(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
export const getRevenueByYearThunk = createAsyncThunk(
    'revenue/getRevenueByYear',
    async (data) => {
        try {
            const res = await getRevenueByYear(data);
            return res;
        } catch (error) {
            return error;
        }
    }
);
