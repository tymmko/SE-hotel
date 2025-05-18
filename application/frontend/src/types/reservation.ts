/**
 * Initial state for the reservation reducer.
 */
export const ReservationInitialState: ReservationStoreType = {
	reservations: [],
	reservation: {
		id: 0,
		guest_id: 0,
		room_id: 0,
		check_in_date: '',
		check_out_date: '',
		status: 'confirmed',
	},
	error: null,
	errorStatus: null,
	loading: false
};

/**
 * Redux state shape for managing reservations.
 */
export type ReservationStoreType = {
	reservations: Reservation[],
	reservation: Reservation,
	loading: boolean,
	error?: any,
	errorStatus?: any,
}

/**
 * Represents a reservation record in the system.
 */
export type Reservation = {
	id: number,
	guest_id: number,
	room_id: number,
	check_in_date: string,
	check_out_date: string,
	status: ReservationStatus,
}

/**
 * Represents the possible statuses of a reservation.
 */
export type ReservationStatus = 'confirmed' |
								'checked-in' |
								'checked-out' |
								'paid';

