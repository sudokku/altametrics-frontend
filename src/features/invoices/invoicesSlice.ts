import { createSlice } from "@reduxjs/toolkit/react";

export interface Invoice {
    id: number;
    name: string;
    amount: number;
    dueDate: string;
    details: string;
    userId: number;
}

interface InvoicesState {
    invoices: Invoice[];
    loading: boolean;
    error: string | null;
}

const initialState: InvoicesState = {
    invoices: [],
    loading: false,
    error: null
};

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        getInvoicesStart(state) {
            state.loading = true;
            state.error = null;
        },
        getInvoicesSuccess(state, action) {
            state.invoices = action.payload;
            state.loading = false;
            state.error = null;
        },
        getInvoicesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { getInvoicesStart, getInvoicesSuccess, getInvoicesFailure } = invoicesSlice.actions;
export default invoicesSlice.reducer;