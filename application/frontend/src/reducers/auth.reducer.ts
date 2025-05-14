import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	token: string | null;
	username: string | null;
	role: string | null;
	error: string | null;
}

const initialState: AuthState = {
	token: localStorage.getItem('token'),
	username: localStorage.getItem('username'),
	role: localStorage.getItem('role'),
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginOk: (state, action: PayloadAction<{ token: string; username: string; role: string }>) => {
			state.token = action.payload.token;
			state.username = action.payload.username;
			state.role = action.payload.role;
			state.error = null;
		},
		loginError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		registerOk: (state, action: PayloadAction<{ token: string; username: string; role: string }>) => {
			state.token = action.payload.token;
			state.username = action.payload.username;
			state.role = action.payload.role;
			state.error = null;
		},
		registerError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		logout: (state) => {
			state.token = null;
			state.username = null;
			state.role = null;
			state.error = null;
			localStorage.clear();
		}
	}
});

export const { loginOk, loginError, registerOk, registerError, logout } = authSlice.actions;
export default authSlice.reducer;
