import axios from 'axios';
import { URL } from './url';
import { Equipment, PriceEntry, Room } from '../types/rooms';
import { Guest } from '../types/guest';

// GET rooms
export const getRooms = async (): Promise<Room[]> => {
	const response = await axios.get(URL.rooms);
	return response.data.rooms;
};

// POST room
export const postRoom = async (room: Omit<Room, 'id'>): Promise<Room> => {
	const response = await axios.post(URL.rooms, room);
	return response.data.room;
};

// GET room by id
export const getRoomById = async (id: string | number): Promise<Room> => {
	const response = await axios.get(URL.room(id));
	return response.data.room;
};

// GET room's price history
export const getPriceHistory = async (id: string | number): Promise<PriceEntry[]> => {
	const response = await axios.get(URL.priceHistory(id));
	return response.data.priceHistory;
};

// GET room's equipment
export const getEquipment = async (id: string | number): Promise<Equipment[]> => {
	const response = await axios.get(URL.equipment(id));
	return response.data.equipment;
};

// GET room's oocupancy
export const getOccupancy = async (id: string | number): Promise<Guest> => {
	const response = await axios.get(URL.occupancy(id));
	return response.data.occupancyInfo.guest;
};