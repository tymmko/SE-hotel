import { AppDispatch } from '../app/store';
import * as actions from '../actions/guests.actions';
import * as API from '../api/guests.api';

/**
 * Thunk for fetching the full list of guests from the API.
 *
 * @remarks
 * - Dispatches `guestsLoading` before starting the request.
 * - On success, dispatches `guestsOk` with the fetched data.
 * - On failure, dispatches `guestsError` with the error object.
 *
 * @example
 * ```ts
 * dispatch(fetchGuests());
 * ```
 */
export const fetchGuests = () => async (dispatch: AppDispatch) => {
	dispatch(actions.guestsLoading());

	try {
		const guests = await API.getGuests();
		dispatch(actions.guestsOk(guests));
	} catch (err) {
		dispatch(actions.guestsError(err));
	}
};

/**
 * Thunk for fetching details of a specific guest by ID.
 *
 * @param id - The ID of the guest to fetch.
 *
 * @remarks
 * - Dispatches `guestLoading` before starting the request.
 * - On success, dispatches `guestOk` with the guest's data.
 * - On failure, dispatches `guestError` with the error object.
 *
 * @example
 * ```ts
 * dispatch(fetchGuestById(101));
 * ```
 */
export const fetchGuestById = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.guestLoading());
	try {
		const guest = await API.getGuestById(id);
		dispatch(actions.guestOk(guest));
	} catch (err) {
		dispatch(actions.guestError(err));
	}
};