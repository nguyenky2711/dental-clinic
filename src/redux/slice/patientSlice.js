import { createSlice } from "@reduxjs/toolkit";
import { filterPatientThunk } from "../action/patient";

const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        listPatients: null,
    },
    reducers: {
        clearPatient: (state) => {
            state.listPatients = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            filterPatientThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.listPatients = payload;
                }
            }
        );

    },
})
export const {
    clearPatient
} = patientSlice.actions;
export default patientSlice.reducer