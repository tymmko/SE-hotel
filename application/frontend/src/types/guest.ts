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

export type GuestStoreType = {
	guests: Guest[],
	guest: Guest,
	loading: boolean,
	error?: any,
}

export type Guest = {
	id: number
	first_name: string
	last_name: string
	email: string
	phone_number: string
}

export const emptyGuest = {
	id: 0,
	first_name: '',
	last_name: '',
	email: '',
	phone_number: '',
}
