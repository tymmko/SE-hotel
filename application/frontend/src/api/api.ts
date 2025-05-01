export const baseURL = process.env.API_BASE_URL || 'https://localhost:3000';

const endpoint = (path: string) => `${baseURL}/api/${path}`;

export const API = {
	// ROOMS
	rooms: endpoint('rooms'),
	room: (id: string | number) => endpoint(`rooms/${id}`),
	priceHistory: (id: string | number) => endpoint(`rooms/${id}/price-history`),
	equipment: (id: string | number) => endpoint(`rooms/${id}/equipment`),
	occupancy: (id: string | number) => endpoint(`rooms/${id}/occupancy`),

	// RESERVATIONS
	reservations: endpoint('reservations'),

	// GUESTS
	guests: endpoint('guests'),
	
	//BILLS
	bills: endpoint('bills'),
}