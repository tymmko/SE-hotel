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
	loading: false
};

export type ReservationStoreType = {
	reservations: Reservation[],
	reservation: Reservation,
	loading: boolean,
	error?: any,
}

export type Reservation = {
	id: number,
	guest_id: number,
	room_id: number,
	check_in_date: string,
	check_out_date: string,
	status: ReservationStatus,
}

export type ReservationStatus = 'confirmed' |
								'checked-in' |
								'checked-out' |
								'paid';

