export const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';

const endpoint = (path: string) => `${baseURL}/api/${path}`;

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
};
