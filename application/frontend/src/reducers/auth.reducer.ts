import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../types/auth';

/**
 * The Redux slice responsible for handling authentication state,
 * including login, registration, and logout actions.
 *
 * @remarks
 * Stores the current token, username, role, and any authentication error.
 */
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		/**
		 * Handles successful login by storing token, username, and role.
		 *
		 * @param state - The current authentication state.
		 * @param action - Payload containing `token`, `username`, and `role`.
		 */
		loginOk: (state, action: PayloadAction<{ token: string; username: string; role: string }>) => {
			state.token = action.payload.token;
			state.username = action.payload.username;
			state.role = action.payload.role;
			state.error = null;
		},

		/**
		 * Handles login failure by storing an error message.
		 *
		 * @param state - The current authentication state.
		 * @param action - Payload containing the error message.
		 */
		loginError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},

		/**
		 * Handles successful registration by storing token, username, and role.
		 *
		 * @param state - The current authentication state.
		 * @param action - Payload containing `token`, `username`, and `role`.
		 */
		registerOk: (state, action: PayloadAction<{ token: string; username: string; role: string }>) => {
			state.token = action.payload.token;
			state.username = action.payload.username;
			state.role = action.payload.role;
			state.error = null;
		},
		
		/**
		 * Handles registration failure by storing an error message.
		 *
		 * @param state - The current authentication state.
		 * @param action - Payload containing the error message.
		 */
		registerError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},

		 /**
		 * Logs out the user by clearing the authentication state and local storage.
		 *
		 * @param state - The current authentication state.
		 */
		logout: (state) => {
			state.token = null;
			state.username = null;
			state.role = null;
			state.error = null;
			localStorage.clear();
		}
	}
});

/** Authentication success and failure actions. */
export const { loginOk, loginError, registerOk, registerError, logout } = authSlice.actions;

/** The reducer for authentication slice. */
export default authSlice.reducer;
