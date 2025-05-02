import axios from 'axios';
import { URL } from './url';
import { Guest } from '../types/guest';

// GET guests
export const getGuests = async (): Promise<Guest[]> => {
	const response = await axios.get(URL.guests);
	return response.data.guests;
};

// GET guest by id
export const getGuestById = async (id: string | number): Promise<Guest> => {
	const response = await axios.get(URL.guest(id));
	return response.data.guest;
};
