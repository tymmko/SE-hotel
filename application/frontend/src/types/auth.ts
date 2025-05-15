export interface AuthState {
    token: string | null;
	username: string | null;
	role: string | null;
	error: string | null;
}

export const initialState: AuthState = {
	token: localStorage.getItem('token'),
	username: localStorage.getItem('username'),
	role: localStorage.getItem('role'),
	error: null,
};
