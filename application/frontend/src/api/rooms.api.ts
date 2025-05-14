import api from './api';
import { URL } from './url';
import { PriceEntry, Room } from '../types/rooms';
import { Guest } from '../types/guest';

// GET rooms
export const getRooms = async (): Promise<Room[]> => {
	const response = await api.get(URL.rooms);
	return response.data.rooms;
};

// POST room
export const postRoom = async (room: Omit<Room, 'id'>): Promise<Room> => {
	const response = await api.post(URL.rooms, room);
	return response.data.room;
};

// GET room by id
export const getRoomById = async (id: string | number): Promise<Room> => {
	const response = await api.get(URL.room(id));
	return response.data.room;
};

// GET room's price history
export const getPriceHistory = async (id: string | number): Promise<PriceEntry[]> => {
	const response = await api.get(URL.priceHistory(id));
	return response.data.priceHistory;
};

// POST room's price entry
export const postPriceEntry = async (id: string | number, priceEntry: Omit<PriceEntry, 'room_id'>): Promise<PriceEntry> => {
	const response = await api.post(URL.priceHistory(id), priceEntry);
	return response.data;
};

// GET room's oocupancy
export const getOccupancy = async (id: string | number): Promise<Guest> => {
	const response = await api.get(URL.occupancy(id));
	return response.data.occupancyInfo.guest;
};
