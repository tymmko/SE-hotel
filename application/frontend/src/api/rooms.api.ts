import api from './api';
import { URL } from './url';
import { PriceEntry, Room } from '../types/rooms';
import { Guest } from '../types/guest';

/**
 * Fetches the list of all rooms from the backend.
 *
 * @returns A promise resolving to an array of `Room` objects.
 *
 * @example
 * const rooms = await getRooms();
 * console.log(rooms[0].name);
 */
export const getRooms = async (): Promise<Room[]> => {
	const response = await api.get(URL.rooms);
	return response.data.rooms;
};

/**
 * Creates a new room.
 *
 * @param room - The room data, excluding the `id` field.
 * @returns A promise resolving to the newly created `Room` object.
 *
 * @example
 * const newRoom = await postRoom({ name: "Suite 1", type: "suite", capacity: 2 });
 */
export const postRoom = async (room: Omit<Room, 'id'>): Promise<Room> => {
	const response = await api.post(URL.rooms, room);
	return response.data.room;
};

/**
 * Fetches a specific room by its ID.
 *
 * @param id - The ID of the room to retrieve.
 * @returns A promise resolving to the corresponding `Room` object.
 *
 * @example
 * const room = await getRoomById(101);
 */
export const getRoomById = async (id: string | number): Promise<Room> => {
	const response = await api.get(URL.room(id));
	return response.data.room;
};

/**
 * Retrieves the price history entries for a specific room.
 *
 * @param id - The ID of the room.
 * @returns A promise resolving to an array of `PriceEntry` objects.
 *
 * @example
 * const history = await getPriceHistory(101);
 */
export const getPriceHistory = async (id: string | number): Promise<PriceEntry[]> => {
	const response = await api.get(URL.priceHistory(id));
	return response.data.priceHistory;
};

/**
 * Adds a new price entry to a room's price history.
 *
 * @param id - The ID of the room.
 * @param priceEntry - The new price entry (excluding room_id).
 * @returns A promise resolving to the newly created `PriceEntry`.
 *
 * @example
 * await postPriceEntry(101, { price: 120, valid_from: "2025-01-01", valid_to: "2025-01-31" });
 */
export const postPriceEntry = async (id: string | number, priceEntry: Omit<PriceEntry, 'room_id'>): Promise<PriceEntry> => {
	const response = await api.post(URL.priceHistory(id), priceEntry);
	return response.data;
};

/**
 * Retrieves the current occupancy (guest) of a room.
 *
 * @param id - The ID of the room.
 * @returns A promise resolving to the `Guest` currently occupying the room.
 *
 * @example
 * const guest = await getOccupancy(101);
 * console.log(guest.fullName);
 */
export const getOccupancy = async (id: string | number): Promise<Guest> => {
	const response = await api.get(URL.occupancy(id));
	return response.data.occupancyInfo.guest;
};
