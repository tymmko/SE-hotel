import api from './api';
import { URL } from './url';
import { Equipment } from '../types/equipments';

/**
 * Fetches the list of all available equipment entries from the backend.
 *
 * @returns A promise resolving to an array of `Equipment` objects.
 *
 * @example
 * const allEquipments = await getEquipments();
 */
export const getEquipments = async (): Promise<Equipment[]> => {
	const response = await api.get(URL.equipments);
	return response.data.equipments;
};

/**
 * Fetches all equipment associated with a specific room.
 *
 * @param id - The ID of the room.
 * @returns A promise resolving to an array of `Equipment` objects for that room.
 *
 * @example
 * const roomEquip = await getEquipment(101);
 */
export const getEquipment = async (id: string | number): Promise<Equipment[]> => {
	const response = await api.get(URL.equipment(id));
	return response.data.equipment;
};

/**
 * Adds a new equipment entry to a specific room.
 *
 * @param id - The ID of the room.
 * @param payload - Partial equipment data to be added.
 * @returns A promise resolving to the newly created `Equipment` object.
 *
 * @example
 * await postEquipment(101, { name: "TV", condition: "good" });
 */
export const postEquipment = async (id: string | number, payload: Partial<Equipment>): Promise<Equipment> => {
	const response = await api.post(URL.equipment(id), payload);
	return response.data;
};

/**
 * Updates an existing equipment entry.
 *
 * @param id - The ID of the equipment.
 * @param payload - Fields to update in the equipment.
 * @returns A promise resolving to the updated `Equipment` object.
 *
 * @example
 * await patchEquipment(7, { condition: "needs repair" });
 */
export const patchEquipment = async (id: number, payload: Partial<Equipment>) => {
	const response = await api.patch(URL.equipmentById(id), payload);
	return response.data;
};
