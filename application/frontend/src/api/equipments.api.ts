import api from './api';
import { URL } from './url';
import { Equipment } from '../types/equipments';

// GET equipments
export const getEquipments = async (): Promise<Equipment[]> => {
	const response = await api.get(URL.equipments);
	return response.data.equipments;
};

// GET room's equipment
export const getEquipment = async (id: string | number): Promise<Equipment[]> => {
	const response = await api.get(URL.equipment(id));
	return response.data.equipment;
};

// POST room's equipment
export const postEquipment = async (id: string | number, payload: Partial<Equipment>): Promise<Equipment> => {
	const response = await api.post(URL.equipment(id), payload);
	return response.data;
};

// PATCH equipment
export const patchEquipment = async (id: number, payload: Partial<Equipment>) => {
	const response = await api.patch(URL.equipmentById(id), payload);
	return response.data;
};
