import { createSlice } from '@reduxjs/toolkit';
import { register, login } from '../actions/auth.actions';

interface AuthState {
  token: string | null;
  role: string | null;
  username: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  username: localStorage.getItem('username') || null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.role = null;
      state.username = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.username = action.payload.username;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.username = action.payload.username;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;