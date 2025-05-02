import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { API } from '../api/api';

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(API.register, { username, email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);
      return { token, role: user.role, username: user.username };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Sign-up failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(API.login, { username, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);
      return { token, role: user.role, username: user.username };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Login failed');
    }
  }
);