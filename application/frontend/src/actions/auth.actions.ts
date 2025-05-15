import { AppDispatch } from '../app/store';
import { loginOk, loginError, registerOk, registerError } from '../reducers/auth.reducer';
import { loginUser, registerUser } from '../api/auth.api';

/**
 * Asynchronous thunk action that logs in a user.
 *
 * Sends credentials to the backend, stores the received token and user info
 * in `localStorage`, and dispatches a success or error action.
 *
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns A thunk function that performs the login flow.
 *
 * @example
 * dispatch(login("admin", "password123"));
 */
export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
	try {
		const { token, user } = await loginUser(username, password);
		localStorage.setItem('token', token);
		localStorage.setItem('role', user.role);
		localStorage.setItem('username', user.username);

		dispatch(loginOk({ token, username: user.username, role: user.role }));
	} catch (err: any) {
		dispatch(loginError(err.response?.data?.error || 'Login failed'));
	}
};

/**
 * Asynchronous thunk action that registers a new user.
 *
 * Sends registration data to the backend, stores the returned token and user info
 * in `localStorage`, and dispatches a success or error action.
 *
 * @param username - Desired username for the new account.
 * @param email - Email address of the new user.
 * @param password - Password for the account.
 * @returns A thunk function that performs the registration flow.
 *
 * @example
 * dispatch(register("jane_doe", "jane@example.com", "secret123"));
 */
export const register = (username: string, email: string, password: string) => async (dispatch: AppDispatch) => {
	try {
		const { token, user } = await registerUser(username, email, password);
		localStorage.setItem('token', token);
		localStorage.setItem('role', user.role);
		localStorage.setItem('username', user.username);

		dispatch(registerOk({ token, username: user.username, role: user.role }));
	} catch (err: any) {
		dispatch(registerError(err.response?.data?.error || 'Register failed'));
	}
};
