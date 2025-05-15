import { Reservation } from '../types/reservation';
import * as constants from '../types/constants';

//
// All reservations (list) actions
//

/**
 * Creates an action indicating that reservations are being loaded.
 *
 * @returns A `RESERVATIONS_LOADING` action.
 */
export const reservationsLoading = () => ({
	type: constants.RESERVATIONS_LOADING,
});

/**
 * Creates an action dispatched when the reservations list loads successfully.
 *
 * @param reservations - An array of `Reservation` objects.
 * @returns A `RESERVATIONS_OK` action with the payload.
 */
export const reservationsOk = (reservations: Reservation[]) => ({
	type: constants.RESERVATIONS_OK,
	reservations
});

/**
 * Creates an action dispatched when loading reservations fails.
 *
 * @param error - An error object or message.
 * @returns A `RESERVATIONS_ERROR` action with the error payload.
 */
export const reservationsError = (error: any) => ({
	type: constants.RESERVATIONS_ERROR,
	error
});


//
// Create reservation actions
//

/**
 * Creates an action indicating that reservation creation has started.
 *
 * @returns A `CREATE_RESERVATION_LOADING` action.
 */
export const createReservationLoading = () => ({
	type: constants.CREATE_RESERVATION_LOADING
});

/**
 * Creates an action dispatched when a reservation is created successfully.
 *
 * @param reservation - The newly created `Reservation` object.
 * @returns A `CREATE_RESERVATION_OK` action with the payload.
 */
export const createReservationOk = (reservation: Reservation) => ({
	type: constants.CREATE_RESERVATION_OK,
	reservation,
});

/**
 * Creates an action dispatched when creating a reservation fails.
 *
 * @param error - An error object or message.
 * @returns A `CREATE_RESERVATION_ERROR` action with the error payload.
 */
export const createReservationError = (error: any) => ({
	type: constants.CREATE_RESERVATION_ERROR,
	error
});


//
// Single reservation fetch actions
//

/**
 * Creates an action indicating that a single reservation is being loaded.
 *
 * @returns A `RESERVATION_LOADING` action.
 */
export const reservationLoading = () => ({
	type: constants.RESERVATION_LOADING,
});

/**
 * Creates an action dispatched when a single reservation is successfully loaded.
 *
 * @param reservation - The loaded `Reservation` object.
 * @returns A `RESERVATION_OK` action with the payload.
 */
export const reservationOk = (reservation: Reservation) => ({
	type: constants.RESERVATION_OK,
	reservation,
});

/**
 * Creates an action dispatched when loading a reservation fails.
 *
 * @param error - An error object or message.
 * @returns A `RESERVATION_ERROR` action with the error payload.
 */
export const reservationError = (error: unknown) => ({
	type: constants.RESERVATION_ERROR,
	error,
});


//
// Reservation status update actions
//

/**
 * Creates an action indicating that reservation status is being updated.
 *
 * @returns A `RESERVATION_STATUS_LOADING` action.
 */
export const reservationStatusLoading = () => ({
	type: constants.RESERVATION_STATUS_LOADING,
});

/**
 * Creates an action dispatched when reservation status is updated successfully.
 *
 * @param reservation - The updated `Reservation` object with new status.
 * @returns A `RESERVATION_STATUS_OK` action with the payload.
 */
export const reservationStatusOk = (reservation: Reservation) => ({
	type: constants.RESERVATION_STATUS_OK,
	reservation,
});

/**
 * Creates an action dispatched when updating reservation status fails.
 *
 * @param error - An error object or message.
 * @returns A `RESERVATION_STATUS_ERROR` action with the error payload.
 */
export const reservationStatusError = (error: unknown) => ({
	type: constants.RESERVATION_STATUS_ERROR,
	error,
});
