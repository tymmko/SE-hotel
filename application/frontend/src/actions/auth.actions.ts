import { AppDispatch } from '../app/store';
import { loginOk, loginError, registerOk, registerError } from '../reducers/auth.reducer';
import { loginUser, registerUser } from '../api/auth.api';

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
