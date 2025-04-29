import { RoomsStoreType } from '../types/RoomsStoreType';
import * as action from '../types/constants';

export const initialState: RoomsStoreType = {
	roomsList: [],
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
}

export const RoomsReducer = (store = initialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};

