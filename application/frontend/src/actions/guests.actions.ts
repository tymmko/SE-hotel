import { Guest } from '../types/guest';
import * as constants from '../types/constants';

//
// Guest list actions
//

/**
 * Creates an action indicating that guest list loading has started.
 *
 * @returns A `GUESTS_LOADING` action.
 */
export const guestsLoading = () => ({
	type: constants.GUESTS_LOADING,
});

/**
 * Creates an action dispatched when guest list is successfully loaded.
 *
 * @param guests - An array of `Guest` objects.
 * @returns A `GUESTS_OK` action with the guests payload.
 */
export const guestsOk = (guests: Guest[]) => ({
	type: constants.GUESTS_OK,
	guests
});

/**
 * Creates an action dispatched when guest list loading fails.
 *
 * @param error - An error object or error message.
 * @returns A `GUESTS_ERROR` action with the error payload.
 */
export const guestsError = (error: any) => ({
	type: constants.GUESTS_ERROR,
	error
});


//
// Single guest actions
//

/**
 * Creates an action indicating that a specific guest is being loaded.
 *
 * @returns A `GUEST_LOADING` action.
 */
export const guestLoading = () => ({
	type: constants.GUEST_LOADING,
});

/**
 * Creates an action dispatched when a guest is successfully loaded.
 *
 * @param guest - The `Guest` object retrieved from the backend.
 * @returns A `GUEST_OK` action with the guest payload.
 */
export const guestOk = (guest: Guest) => ({
	type: constants.GUEST_OK,
	guest,
});

/**
 * Creates an action dispatched when loading a guest fails.
 *
 * @param error - An error object or error message.
 * @returns A `GUEST_ERROR` action with the error payload.
 */
export const guestError = (error: unknown) => ({
	type: constants.GUEST_ERROR,
	error,
});
