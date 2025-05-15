import { Equipment, EquipmentInitialState, EquipmentsStoreType } from '../types/equipments';
import * as action from '../types/constants';

/**
 * A map of action types to reducer functions that manage equipment-related state.
 *
 * @remarks
 * This reducer handles global equipment data as well as room-specific equipment
 * operations (load, create, update), using a manual `actionMap` dispatch pattern.
 */
const actionMap = {
	//
	// Load all available equipment
	//

	/**
	 * Sets the state to loading for fetching all available equipment.
	 */
	[action.EQUIPMENTS_LOADING]: (store: EquipmentsStoreType): EquipmentsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	/**
	 * Updates the state with a loaded list of available equipment.
	 */
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
	/**
	 * Sets an error state for failed equipment fetch.
	 */
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

	//
	// Load equipment assigned to a room
	//

	/**
	 * Sets the state to loading when fetching equipment for a specific room.
	 */
	[action.EQUIPMENT_LOADING]: (store: EquipmentsStoreType): EquipmentsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	/**
	 * Updates the state with the list of equipment associated with a room.
	 */
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
	/**
	 * Sets an error state when loading room equipment fails.
	 */
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

	//
	// Create new equipment
	//

	/**
	 * Sets the state to loading during equipment creation.
	 */
	[action.EQUIPMENT_CREATE_LOADING]: (store: EquipmentsStoreType): EquipmentsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	/**
	 * Appends a newly created equipment item to the room's equipment list.
	 */
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
	/**
	 * Sets an error state if equipment creation fails.
	 */
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

	//
	// Update existing equipment
	//

	/**
	 * Sets the state to loading during an equipment update operation.
	 */
	[action.EQUIPMENT_UPDATE_LOADING]: (store: EquipmentsStoreType): EquipmentsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	/**
	 * Updates the equipment list by replacing the modified equipment item.
	 */
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
	/**
	 * Sets an error state if the equipment update fails.
	 */
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

/**
 * Reducer function for managing equipment-related state.
 *
 * @param store - Current equipment store state.
 * @param action - Dispatched Redux action.
 * @returns The updated `EquipmentsStoreType` state.
 */
export const EquipmentsReducer = (store = EquipmentInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
