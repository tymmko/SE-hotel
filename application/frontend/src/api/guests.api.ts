import api from './api';
import { URL } from './url';
import { Guest } from '../types/guest';

// GET guests
export const getGuests = async (): Promise<Guest[]> => {
	const response = await api.get(URL.guests);
	return response.data.guests;
};

// GET guest by id
export const getGuestById = async (id: string | number): Promise<Guest> => {
	const response = await api.get(URL.guest(id));
	return response.data.guest;
};
