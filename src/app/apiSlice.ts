import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { User } from "../features/auth/authSlice";

export interface AuthRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    name: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (build) => ({
        login: build.mutation<AuthResponse, AuthRequest>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            })
        }),
        register: build.mutation<AuthResponse, RegisterRequest>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body
            })
        }),
        getBills: build.query<any[], void>({
            query: () => 'bills'
        }),
        getBillById: build.query<any, string>({
            query: (id) => `bills/${id}`
        }),
        getInvoices: build.query<any[], void>({
            query: () => 'invoices'
        }),
        getInvoiceById: build.query<any, string>({
            query: (id) => `invoices/${id}`
        }),
    })
});

export const { useLoginMutation, useRegisterMutation, useGetBillsQuery, useGetBillByIdQuery, useGetInvoicesQuery, useGetInvoiceByIdQuery } = apiSlice;