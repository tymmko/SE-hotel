import axios from 'axios';
import { API } from './api';
import { Room } from '../types/rooms';

// GET rooms
export const getRooms = async (): Promise<Room[]> => {
	const response = await axios.get(API.rooms);
	return response.data.rooms;
};

// POST room
export const postRoom = async (room: Omit<Room, 'id'>): Promise<Room[]> => {
	const response = await axios.post(API.rooms, room);
	return response.data.room;
};

export const getRoomById = async (id: string | number): Promise<Room[]> => {
	const response = await axios.get(API.room(id));
	return response.data.room;
};

export const getPriceHistory = async (id: string | number): Promise<Room[]> => {
	const response = await axios.get(API.priceHistory(id));
	return response.data.priceHistory;
};

export const getEquipment = async (id: string | number): Promise<Room[]> => {
	const response = await axios.get(API.equipment(id));
	return response.data.equipment;
};