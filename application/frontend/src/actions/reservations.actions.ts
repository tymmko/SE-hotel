import { Reservation } from '../types/reservation';
import * as constants from '../types/constants';

export const reservationsLoading = () => ({
	type: constants.RESERVATIONS_LOADING,
});

export const reservationsOk = (reservations: Reservation[]) => ({
	type: constants.RESERVATIONS_OK,
	reservations
});

export const reservationsError = (error: any) => ({
	type: constants.RESERVATIONS_ERROR,
	error
});



export const createReservationLoading = () => ({
	type: constants.CREATE_RESERVATION_LOADING
});

export const createReservationOk = (reservation: Reservation) => ({
	type: constants.CREATE_RESERVATION_OK,
	reservation,
});

export const createReservationError = (error: any) => ({
	type: constants.CREATE_RESERVATION_ERROR,
	error
});



export const reservationLoading = () => ({
	type: constants.RESERVATION_LOADING,
});

export const reservationOk = (reservation: any) => ({
	type: constants.RESERVATION_OK,
	reservation,
});

export const reservationError = (error: unknown) => ({
	type: constants.RESERVATION_ERROR,
	error,
});



export const reservationStatusLoading = () => ({
	type: constants.RESERVATION_STATUS_LOADING,
});

export const reservationStatusOk = (reservation: any) => ({
	type: constants.RESERVATION_STATUS_OK,
	reservation,
});

export const reservationStatusError = (error: unknown) => ({
	type: constants.RESERVATION_STATUS_ERROR,
	error,
});
