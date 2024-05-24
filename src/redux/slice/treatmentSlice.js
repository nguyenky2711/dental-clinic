import { createSlice } from "@reduxjs/toolkit";
import { filterTreatmentsThunk, getServicesMedicalThunk } from "../action/treatment";

const treatmentSlice = createSlice({
    name: 'treatment',
    initialState: {
        listTreatments: null,
        listServices: null,
    },
    reducers: {
        clearTreatment: (state) => {
            state.listTreatments = null;
            state.listServices = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            filterTreatmentsThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.listTreatments = payload;
                }
            }
        );
        builder.addCase(
            getServicesMedicalThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.listServices = payload;
                }
            }
        );
    },
})
export const {
    clearTreatment
} = treatmentSlice.actions;
export default treatmentSlice.reducer