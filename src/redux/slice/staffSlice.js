import { createSlice } from "@reduxjs/toolkit";
import { filterStaffThunk } from "../action/staff";

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        listStaffs: null,
    },
    reducers: {
        clearStaff: (state) => {
            state.listStaffs = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            filterStaffThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.listStaffs = payload;
                }
            }
        );

    },
})
export const {
    clearStaff
} = staffSlice.actions;
export default staffSlice.reducer