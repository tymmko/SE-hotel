import axios from 'axios';

export const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';

const endpoint = (path: string) => `${baseURL}/api/${path}`;

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

export const URL = {
	// AUTH
	register: endpoint('register'),
	login: endpoint('login'),

	// ROOMS
	rooms: endpoint('rooms'),
	room: (id: string | number) => endpoint(`rooms/${id}`),
	priceHistory: (id: string | number) => endpoint(`rooms/${id}/price-history`),
	equipment: (id: string | number) => endpoint(`rooms/${id}/equipment`),
	occupancy: (id: string | number) => endpoint(`rooms/${id}/occupancy`),

	// RESERVATIONS
	reservations: endpoint('reservations'),
	reservation: (id: string | number) => endpoint(`reservations/${id}`),

	// GUESTS
	guests: endpoint('guests'),
	guest: (id: string | number) => endpoint(`guests/${id}`),
	
	//BILLS
	bills: endpoint('bills'),
}

export default api;
