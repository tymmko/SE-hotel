export const endpoint = (path: string) => path;

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

	// EQUIPMET
	equipments: endpoint('equipments'),
	equipmentById: (id: string | number) => endpoint(`equipment/${id}`),

	// RESERVATIONS
	reservations: endpoint('reservations'),
	reservation: (id: string | number) => endpoint(`reservations/${id}`),
	reservationStatus: (id: string | number) => endpoint(`reservations/${id}/status`),

	// GUESTS
	guests: endpoint('guests'),
	guest: (id: string | number) => endpoint(`guests/${id}`),
	
	// BILLS
	bills: endpoint('bills'),
	bill: (id: string | number) => endpoint(`bills/${id}`),
};
