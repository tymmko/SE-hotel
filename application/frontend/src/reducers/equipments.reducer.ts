import { Equipment, EquipmentInitialState, EquipmentsStoreType } from '../types/equipments';
import * as action from '../types/constants';

const actionMap = {
	[action.EQUIPMENTS_LOADING]: (store: EquipmentsStoreType): EquipmentsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	[action.EQUIPMENTS_OK]: (
		store: EquipmentsStoreType,
		action: {
			equipments: EquipmentsStoreType['equipments'],
		}
	): EquipmentsStoreType => ({
		...store,
		loading: false,
		equipments: action.equipments,
	}),
	[action.EQUIPMENTS_ERROR]: (
		store: EquipmentsStoreType,
		action: {
			error: unknown,
		}
	): EquipmentsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),

	// GET EQUIPMENTS OF ROOM
	[action.EQUIPMENT_LOADING]: (store: EquipmentsStoreType): EquipmentsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	[action.EQUIPMENT_OK]: (
		store: EquipmentsStoreType,
		action: {
			equipment: EquipmentsStoreType['equipments'],
		}
	): EquipmentsStoreType => ({
		...store,
		loading: false,
		roomEquipments: action.equipment,
	}),
	[action.EQUIPMENT_ERROR]: (
		store: EquipmentsStoreType,
		action: {
			error: unknown,
		}
	): EquipmentsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),

	// POST EQUIPMENT
	[action.EQUIPMENT_CREATE_LOADING]: (store: EquipmentsStoreType): EquipmentsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	[action.EQUIPMENT_CREATE_OK]: (
		store: EquipmentsStoreType,
		action: {
			equipment: Equipment,
		}
	): EquipmentsStoreType => ({
		...store,
		loading: false,
		roomEquipments: [...store.roomEquipments, action.equipment],
	}),
	[action.EQUIPMENT_CREATE_ERROR]: (
		store: EquipmentsStoreType,
		action: {
			error: unknown,
		}
	): EquipmentsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),

	// UPDATE EQUIPMENT
	[action.EQUIPMENT_UPDATE_LOADING]: (store: EquipmentsStoreType): EquipmentsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	[action.EQUIPMENT_UPDATE_OK]: (
		store: EquipmentsStoreType,
		action: {
			equipment: Equipment,
		}
	): EquipmentsStoreType => ({
		...store,
		loading: false,
		roomEquipments: store.roomEquipments.map((eq) =>
			eq.id === action.equipment.id ? action.equipment : eq
		),
	}),
	[action.EQUIPMENT_UPDATE_ERROR]: (
		store: EquipmentsStoreType,
		action: {
			error: unknown,
		}
	): EquipmentsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),
}

export const EquipmentsReducer = (store = EquipmentInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
