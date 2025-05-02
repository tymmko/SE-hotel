import axios from 'axios';
import { Reservation } from '../types/reservation';
import { URL } from './url';

// GET reservations
export const getReservations = async (): Promise<Reservation[]> => {
	const response = await axios.get(URL.reservations);
	return response.data.reservations;
};

// POST reservation
export const postReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation> => {
	const response = await axios.post(URL.reservations, reservation);
	return response.data.reservation;
};

// GET reservation by id
export const getReservationById = async (id: string | number): Promise<Reservation> => {
	const response = await axios.get(URL.reservation(id));
	return response.data.reservation;
};