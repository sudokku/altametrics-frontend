import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import billsReducer from "../features/bills/billsSlice";
import invoicesReducer from "../features/invoices/invoicesSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        billing: billsReducer,
        invoices: invoicesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;