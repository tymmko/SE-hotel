/**
 * A utility function for generating API endpoint paths.
 * 
 * @param path - The API path to be returned.
 * @returns The same path, unchanged.
 *
 * @remarks
 * This function exists for possible future path manipulation
 * or environment-specific logic.
 */
export const endpoint = (path: string) => path;

/**
 * An object that maps all logical backend endpoints used in the application.
 *
 * Each entry corresponds to a resource or action provided by the backend API.
 * Functions are used for endpoints that require dynamic parameters (e.g., `id`).
 */
export const URL = {
	// AUTH
	/** Endpoint for user registration. */
	register: endpoint('register'),

	/** Endpoint for user login. */
	login: endpoint('login'),

	// ROOMS
	/** Endpoint to retrieve or create rooms. */
	rooms: endpoint('rooms'),

	/**
	 * Endpoint to get or modify a specific room.
	 * @param id - Room ID
	 */
	room: (id: string | number) => endpoint(`rooms/${id}`),

	/**
	 * Endpoint to get or post a room's price history.
	 * @param id - Room ID
	 */
	priceHistory: (id: string | number) => endpoint(`rooms/${id}/price-history`),

	/**
	 * Endpoint to retrieve or modify a room's equipment.
	 * @param id - Room ID
	 */
	equipment: (id: string | number) => endpoint(`rooms/${id}/equipment`),

	/**
	 * Endpoint to fetch the current guest occupying the room.
	 * @param id - Room ID
	 */
	occupancy: (id: string | number) => endpoint(`rooms/${id}/occupancy`),

	// EQUIPMET
	/** Endpoint to fetch all available equipment. */
	equipments: endpoint('equipments'),

	/**
	 * Endpoint to update or delete a specific equipment item.
	 * @param id - Equipment ID
	 */
	equipmentById: (id: string | number) => endpoint(`equipment/${id}`),

	// RESERVATIONS
	/** Endpoint to retrieve or create reservations. */
	reservations: endpoint('reservations'),

	/**
	 * Endpoint to retrieve or modify a specific reservation.
	 * @param id - Reservation ID
	 */
	reservation: (id: string | number) => endpoint(`reservations/${id}`),

	/**
	 * Endpoint to update the status of a reservation.
	 * @param id - Reservation ID
	 */
	reservationStatus: (id: string | number) => endpoint(`reservations/${id}/status`),

	// GUESTS
	/** Endpoint to fetch all guests. */
	guests: endpoint('guests'),

	/**
	 * Endpoint to retrieve or update a specific guest.
	 * @param id - Guest ID
	 */
	guest: (id: string | number) => endpoint(`guests/${id}`),
	
	// BILLS
	/** Endpoint to retrieve or create bills. */
	bills: endpoint('bills'),

	 /**
	 * Endpoint to retrieve a specific bill.
	 * @param id - Bill ID
	 */
	bill: (id: string | number) => endpoint(`bills/${id}`),
};
