import { RoomsStoreType } from '../types/rooms';
import * as action from '../types/constants';

export const initialState: RoomsStoreType = {
	roomsList: [],
	room: {
		id: 0,
		type: 'single',
		status: 'occupied'
	},
	priceHistory: [],
	equipment: [],
	guest: {
		id: 0,
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
	},
	error: null,
	loading: false
};

const actionMap = {
	[action.ROOMS_LIST_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
	}),
	[action.ROOMS_LIST_OK]: (
		store: RoomsStoreType,
		action: {
			rooms: RoomsStoreType['roomsList'],
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		roomsList: action.rooms,
	}),
	[action.ROOMS_LIST_ERROR]: (
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
		roomsList: [
			...store.roomsList,
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
	}),
}

export const RoomsReducer = (store = initialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};

