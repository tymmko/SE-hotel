import api from './api';
import { Reservation, ReservationStatus } from '../types/reservation';
import { URL } from './url';

/**
 * Fetches all reservations from the backend.
 *
 * @returns A promise resolving to an array of `Reservation` objects.
 *
 * @example
 * const reservations = await getReservations();
 * console.log(reservations.length);
 */
export const getReservations = async (): Promise<Reservation[]> => {
	const response = await api.get(URL.reservations);
	return response.data.reservations;
};

/**
 * Creates a new reservation.
 *
 * @param reservation - The reservation data, excluding the ID field.
 * @returns A promise resolving to the created `Reservation` object.
 *
 * @example
 * const newReservation = await postReservation({
 *   guestId: 1,
 *   roomId: 101,
 *   checkInDate: '2024-10-01',
 *   checkOutDate: '2024-10-05',
 *   status: 'pending'
 * });
 */
export const postReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation> => {
	const response = await api.post(URL.reservations, reservation);
	return response.data.reservation;
};

/**
 * Fetches a reservation by its unique ID.
 *
 * @param id - The ID of the reservation.
 * @returns A promise resolving to the corresponding `Reservation` object.
 *
 * @example
 * const reservation = await getReservationById(10);
 * console.log(reservation.status);
 */
export const getReservationById = async (id: string | number): Promise<Reservation> => {
	const response = await api.get(URL.reservation(id));
	return response.data.reservation;
};

/**
 * Updates the status of a reservation.
 *
 * @param id - The ID of the reservation to update.
 * @param status - The new status to apply (e.g., 'confirmed', 'checked-in').
 * @returns A promise resolving to the updated `Reservation` object.
 *
 * @example
 * const updated = await putStatus(5, 'checked-in');
 */
export const putStatus = async (id: string | number, status: ReservationStatus): Promise<Reservation> => {
	const response = await api.put(URL.reservationStatus(id), {status: status});
	return response.data.reservation;
};
