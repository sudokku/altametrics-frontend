import { createSlice } from "@reduxjs/toolkit/react";

export interface Bill {
    id: number;
    name: string;
    amount: number;
    dueDate: string;
    details: string;
    userId: number;
}

interface BillsState {
    bills: Bill[];
    loading: boolean;
    sort: 'asc' | 'desc';
    sortBy: 'name' | 'amount' | 'dueDate';
    error: string | null;
}

const initialState: BillsState = {
    bills: [],
    loading: false,
    sort: 'asc',
    sortBy: 'name',
    error: null
};

const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        getBillsStart(state) {
            state.loading = true;
            state.error = null;
        },
        getBillsSuccess(state, action) {
            state.bills = action.payload;
            state.loading = false;
            state.error = null;
        },
        getBillsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { getBillsStart, getBillsSuccess, getBillsFailure } = billsSlice.actions;
export default billsSlice.reducer;