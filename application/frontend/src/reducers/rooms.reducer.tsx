import { RoomInitialState, RoomsStoreType } from '../types/rooms';
import * as action from '../types/constants';
import { emptyGuest } from '../types/guest';

const actionMap = {
	[action.ROOMS_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
	}),
	[action.ROOMS_OK]: (
		store: RoomsStoreType,
		action: {
			rooms: RoomsStoreType['rooms'],
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		rooms: action.rooms,
	}),
	[action.ROOMS_ERROR]: (
		store: RoomsStoreType,
		action: {
			error: unknown,
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),
	// CREATE ROOM
	[action.CREATE_ROOM_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
	}),
	[action.CREATE_ROOM_OK]: (
		store: RoomsStoreType,
		action: {
			room: RoomsStoreType['room'],
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		rooms: [
			...store.rooms,
			action.room,
		],
	}),
	[action.CREATE_ROOM_ERROR]: (
		store: RoomsStoreType,
		action: {
			error: unknown,
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),

	// GET ROOM BY ID
	[action.ROOM_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
	}),
	[action.ROOM_OK]: (
		store: RoomsStoreType,
		action: {
			room: RoomsStoreType['room'],
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		room: action.room
	}),
	[action.ROOM_ERROR]: (
		store: RoomsStoreType,
		action: {
			error: unknown,
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),
	
	// GET PRICE HISTORY
	[action.PRICE_HISTORY_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
	}),
	[action.PRICE_HISTORY_OK]: (
		store: RoomsStoreType,
		action: {
			priceHistory: RoomsStoreType['priceHistory'],
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		priceHistory: action.priceHistory,
	}),
	[action.PRICE_HISTORY_ERROR]: (
		store: RoomsStoreType,
		action: {
			error: unknown,
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),
	// GET EQUIPMENT
	[action.EQUIPMENT_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
	}),
	[action.EQUIPMENT_OK]: (
		store: RoomsStoreType,
		action: {
			equipment: RoomsStoreType['equipment'],
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		equipment: action.equipment,
	}),
	[action.EQUIPMENT_ERROR]: (
		store: RoomsStoreType,
		action: {
			error: unknown,
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),
	// GET OCCUPANCY
	[action.OCCUPANCY_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
	}),
	[action.OCCUPANCY_OK]: (
		store: RoomsStoreType,
		action: {
			guest: RoomsStoreType['guest'],
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		guest: action.guest,
	}),
	[action.OCCUPANCY_ERROR]: (
		store: RoomsStoreType,
		action: {
			error: unknown,
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		error: action.error,
		guest: emptyGuest,
	}),
}

export const RoomsReducer = (store = RoomInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
