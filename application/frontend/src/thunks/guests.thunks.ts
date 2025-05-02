import { AppDispatch } from '../app/store';
import * as actions from '../actions/guests.actions';
import * as API from '../api/guests.api';

export const fetchGuests = () => async (dispatch: AppDispatch) => {
	dispatch(actions.guestsLoading());

	try {
		const guests = await API.getGuests();
		dispatch(actions.guestsOk(guests));
	} catch (err) {
		dispatch(actions.guestsError(err));
	}
};

export const fetchGuestById = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.guestLoading());
	try {
		const guest = await API.getGuestById(id);
		dispatch(actions.guestOk(guest));
	} catch (err) {
		dispatch(actions.guestError(err));
	}
};