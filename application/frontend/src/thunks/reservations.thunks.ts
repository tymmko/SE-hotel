import { AppDispatch } from '../app/store';
import * as actions from '../actions/reservations.actions';
import * as API from '../api/reservations.api';
import { Reservation, ReservationStatus } from '../types/reservation';

/**
 * Thunk to fetch the full list of reservations.
 *
 * @remarks
 * Dispatches `reservationsLoading`, then:
 * - `reservationsOk` on success
 * - `reservationsError` on failure
 *
 * @example
 * ```ts
 * dispatch(fetchReservations());
 * ```
 */
export const fetchReservations = () => async (dispatch: AppDispatch) => {
	dispatch(actions.reservationsLoading());

	try {
		const reservations = await API.getReservations();
		dispatch(actions.reservationsOk(reservations));
	} catch (err) {
		dispatch(actions.reservationsError(err));
	}
};

/**
 * Thunk to create a new reservation.
 *
 * @param reservation - Reservation data excluding the ID.
 *
 * @remarks
 * Dispatches `createReservationLoading`, then:
 * - `createReservationOk` on success
 * - `createReservationError` on failure
 *
 * @example
 * ```ts
 * dispatch(createReservation({ guestId: 1, roomId: 5, ... }));
 * ```
 */
export const createReservation = (reservation: Omit<Reservation, 'id'>) => async (dispatch: AppDispatch) => {
	dispatch(actions.createReservationLoading());

	try {
		const newReservation = await API.postReservation(reservation);
		dispatch(actions.createReservationOk(newReservation));
	} catch (err) {
		dispatch(actions.createReservationError(err));
	}
};

/**
 * Thunk to fetch a specific reservation by its ID.
 *
 * @param id - The reservation ID to retrieve.
 *
 * @remarks
 * Dispatches `reservationLoading`, then:
 * - `reservationOk` on success
 * - `reservationError` on failure
 *
 * @example
 * ```ts
 * dispatch(fetchReservationById(42));
 * ```
 */
export const fetchReservationById = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.reservationLoading());
	try {
		const reservation = await API.getReservationById(id);
		dispatch(actions.reservationOk(reservation));
	} catch (err) {
		dispatch(actions.reservationError(err));
	}
};

/**
 * Thunk to update the status of a reservation.
 *
 * @param id - The reservation ID.
 * @param status - The new status to assign (e.g., `checked-in`, `cancelled`, etc.).
 *
 * @remarks
 * Dispatches `reservationStatusLoading`, then:
 * - `reservationStatusOk` on success
 * - `reservationStatusError` on failure
 *
 * @example
 * ```ts
 * dispatch(updateReservationStatus(42, 'checked-in'));
 * ```
 */
export const updateReservationStatus = (id: string | number, status: ReservationStatus) => async (dispatch: AppDispatch) => {
	dispatch(actions.reservationStatusLoading());
	try {
		const newStatus = await API.putStatus(id, status);
		dispatch(actions.reservationStatusOk(newStatus));
	} catch (err: any) {
		const message = err?.response?.data?.message || err?.message || 'Unexpected error';
		dispatch(actions.reservationStatusError({ message }));
	}
};
