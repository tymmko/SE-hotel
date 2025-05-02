import { GuestInitialState, GuestStoreType } from "../types/guest";
import * as action from '../types/constants';

const actionMap = {
	[action.GUESTS_LOADING]: (store: GuestStoreType): GuestStoreType => ({
		...store,
		loading: true,
	}),
	[action.GUESTS_OK]: (
		store: GuestStoreType,
		action: {
			guests: GuestStoreType['guests'],
		}
	): GuestStoreType => ({
		...store,
		loading: false,
		guests: action.guests,
	}),
	[action.GUESTS_ERROR]: (
		store: GuestStoreType,
		action: {
			error: unknown,
		}
	): GuestStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),
	// GET GUEST BY ID
	[action.GUEST_LOADING]: (store: GuestStoreType): GuestStoreType => ({
		...store,
		loading: true,
	}),
	[action.GUEST_OK]: (
		store: GuestStoreType,
		action: {
			guest: GuestStoreType['guest'],
		}
	): GuestStoreType => ({
		...store,
		loading: false,
		guest: action.guest
	}),
	[action.GUEST_ERROR]: (
		store: GuestStoreType,
		action: {
			error: unknown,
		}
	): GuestStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),
}

export const GuestReducer = (store = GuestInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
