import api from './api';
import { Reservation, ReservationStatus } from '../types/reservation';
import { URL } from './url';

// GET reservations
export const getReservations = async (): Promise<Reservation[]> => {
	const response = await api.get(URL.reservations);
	return response.data.reservations;
};

// POST reservation
export const postReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation> => {
	const response = await api.post(URL.reservations, reservation);
	return response.data.reservation;
};

// GET reservation by id
export const getReservationById = async (id: string | number): Promise<Reservation> => {
	const response = await api.get(URL.reservation(id));
	return response.data.reservation;
};

// PUT reservation status
export const putStatus = async (id: string | number, status: ReservationStatus): Promise<Reservation> => {
	const response = await api.put(URL.reservationStatus(id), {status: status});
	return response.data.reservation;
};
