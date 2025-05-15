import { GuestInitialState, GuestStoreType } from "../types/guest";
import * as action from '../types/constants';

/**
 * A mapping of action types to reducer handlers for guest-related state.
 *
 * @remarks
 * This reducer supports both guest list and single guest loading operations,
 * using a manual reducer dispatch map.
 */
const actionMap = {
	//
	// Load all guests
	//

	/**
	 * Marks the store as loading when fetching all guests.
	 */
	[action.GUESTS_LOADING]: (store: GuestStoreType): GuestStoreType => ({
		...store,
		loading: true,
	}),
	/**
	 * Updates the store with a loaded list of guests.
	 */
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
	/**
	 * Sets an error when guest list loading fails.
	 */
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

	//
	// Load a single guest by ID
	//

	/**
	 * Marks the store as loading when fetching a single guest.
	 */
	[action.GUEST_LOADING]: (store: GuestStoreType): GuestStoreType => ({
		...store,
		loading: true,
	}),
	/**
	 * Updates the store with the loaded guest data.
	 */
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
	/**
	 * Sets an error when loading a single guest fails.
	 */
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

/**
 * Reducer function for managing guest-related state.
 *
 * @param store - The current guest state store.
 * @param action - The dispatched action with type and payload.
 * @returns The updated `GuestStoreType` state.
 *
 * @example
 * const nextState = GuestReducer(prevState, { type: GUESTS_OK, guests: [...] });
 */
export const GuestReducer = (store = GuestInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
