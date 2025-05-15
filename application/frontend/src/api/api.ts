import axios from "axios";

/**
 * Axios instance pre-configured to use the application's API base URL.
 *
 * The base URL is taken from the environment variable `API_BASE_URL`
 * and defaults to `/api` if not set. All API requests from the frontend
 * should go through this instance.
 *
 * @remarks
 * This instance also adds an `Authorization` header with a bearer token,
 * if available in local storage under the key `'token'`.
 */
const api = axios.create({
	baseURL: `${process.env.API_BASE_URL}/api` || '/api',
});

/**
 * Axios request interceptor to attach a JWT bearer token if available.
 *
 * @param config - The Axios request configuration.
 * @returns The modified request config with `Authorization` header if token exists.
 */
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;