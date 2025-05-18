/**
 * Initial default values for the equipment store.
 */
export const EquipmentInitialState: EquipmentsStoreType = {
	equipments: [],
	roomEquipments: [],
	equipment: {
		id: 0,
		name: '',
		price: 0,
		room_id: 0,
	},
	error: null,
	loading: false
};

/**
 * Represents the shape of the equipment-related slice of the Redux store.
 */
export type EquipmentsStoreType = {
	equipments : Equipment[],
	roomEquipments: Equipment[],
	equipment: Equipment,
	error: unknown | null,
	loading: boolean,
}

/**
 * Represents a single equipment item.
 */
export type Equipment = {
	id: number,
	name: string,
	price: number,
	room_id: number,
};
