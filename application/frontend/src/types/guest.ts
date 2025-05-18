
/**
 * Initial state for the guest reducer.
 */
export const GuestInitialState: GuestStoreType = {
	guests: [],
	guest: {
		id: 0,
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
	},
	error: null,
	loading: false
};

/**
 * Shape of the Redux state for managing guest data.
 */
export type GuestStoreType = {
	guests: Guest[],
	guest: Guest,
	loading: boolean,
	error?: any,
}

/**
 * Represents a guest in the hotel system.
 */
export type Guest = {
	id: number
	first_name: string
	last_name: string
	email: string
	phone_number: string
}

/**
 * A reusable empty guest object.
 */
export const emptyGuest = {
	id: 0,
	first_name: '',
	last_name: '',
	email: '',
	phone_number: '',
}
