import api from './api';
import { URL } from './url';

/**
 * Sends a login request to the backend API.
 *
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns A promise that resolves with the response data containing user and token info.
 *
 * @example
 * const data = await loginUser("admin", "admin123");
 * console.log(data.token);
 */
export const loginUser = async (username: string, password: string) => {
	const response = await api.post(URL.login, { username, password });
	return response.data;
};

/**
 * Sends a registration request to the backend API.
 *
 * @param username - Desired username for the new user.
 * @param email - Email address of the new user.
 * @param password - Password to associate with the account.
 * @returns A promise that resolves with the response data, typically the new user record.
 *
 * @example
 * const newUser = await registerUser("jane_doe", "jane@example.com", "secret123");
 */
export const registerUser = async (username: string, email: string, password: string) => {
	const response = await api.post(URL.register, { username, email, password });
	return response.data;
};
