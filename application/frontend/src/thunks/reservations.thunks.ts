import { AppDispatch } from '../app/store';
import * as actions from '../actions/reservations.actions';
import * as API from '../api/reservations.api';
import { Reservation } from '../types/reservation';

export const fetchReservations = () => async (dispatch: AppDispatch) => {
	dispatch(actions.reservationsLoading());

	try {
		const reservations = await API.getReservations();
		dispatch(actions.reservationsOk(reservations));
	} catch (err) {
		dispatch(actions.reservationsError(err));
	}
};

export const createReservation = (reservation: Omit<Reservation, 'id'>) => async (dispatch: AppDispatch) => {
	dispatch(actions.createReservationLoading());

	try {
		const newReservation = await API.postReservation(reservation);
		dispatch(actions.createReservationOk(newReservation));
	} catch (err) {
		dispatch(actions.createReservationError(err));
	}
};


export const fetchReservationById = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.reservationLoading());
	try {
		const reservation = await API.getReservationById(id);
		dispatch(actions.reservationOk(reservation));
	} catch (err) {
		dispatch(actions.reservationError(err));
	}
};