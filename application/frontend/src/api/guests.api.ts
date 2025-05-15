import api from './api';
import { URL } from './url';
import { Guest } from '../types/guest';

/**
 * Fetches a list of all registered guests from the backend.
 *
 * @returns A promise resolving to an array of `Guest` objects.
 *
 * @example
 * const guests = await getGuests();
 * console.log(guests.length);
 */
export const getGuests = async (): Promise<Guest[]> => {
	const response = await api.get(URL.guests);
	return response.data.guests;
};

/**
 * Fetches details for a single guest by their ID.
 *
 * @param id - The unique identifier of the guest.
 * @returns A promise resolving to a `Guest` object.
 *
 * @example
 * const guest = await getGuestById(42);
 * console.log(guest.fullName);
 */
export const getGuestById = async (id: string | number): Promise<Guest> => {
	const response = await api.get(URL.guest(id));
	return response.data.guest;
};
