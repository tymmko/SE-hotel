import axios from "axios";
import { baseURL } from "./url";

const api = axios.create({
	baseURL: `${baseURL}/api`,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;