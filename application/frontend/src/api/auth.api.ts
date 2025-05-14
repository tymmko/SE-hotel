import api from './api';
import { URL } from './url';

export const loginUser = async (username: string, password: string) => {
	const response = await api.post(URL.login, { username, password });
	return response.data;
};

export const registerUser = async (username: string, email: string, password: string) => {
	const response = await api.post(URL.register, { username, email, password });
	return response.data;
};
