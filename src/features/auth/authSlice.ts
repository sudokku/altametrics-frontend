import { createSlice } from "@reduxjs/toolkit";

export interface User {
    id: number;
    email: string;
    name: string | null;
}

interface AuthState {
    token: string | null;
    user: User | null;
};

const initialState: AuthState = {
    token: null,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout(state) {
            state.token = null;
            state.user = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;