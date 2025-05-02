import { Guest } from '../types/guest';
import * as constants from '../types/constants';

export const guestsLoading = () => ({
	type: constants.GUESTS_LOADING,
});

export const guestsOk = (guests: Guest[]) => ({
	type: constants.GUESTS_OK,
	guests
});

export const guestsError = (error: any) => ({
	type: constants.GUESTS_ERROR,
	error
});



export const guestLoading = () => ({
	type: constants.GUEST_LOADING,
});

export const guestOk = (guest: any) => ({
	type: constants.GUEST_OK,
	guest,
});

export const guestError = (error: unknown) => ({
	type: constants.GUEST_ERROR,
	error,
});
