import { PriceEntry, RoomInitialState, RoomsStoreType } from '../types/rooms';
import * as action from '../types/constants';
import { emptyGuest } from '../types/guest';

/**
 * A mapping of Redux action types to reducer handlers for room-related state.
 *
 * @remarks
 * This reducer supports loading room lists, handling individual room data,
 * price history, guest occupancy, and room creation.
 */
const actionMap = {
	//
	// Room list actions
	//

	/**
	 * Sets loading state when fetching all rooms.
	 */
	[action.ROOMS_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	/**
	 * Sets fetched room list in store.
	 */
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
	/**
	 * Handles error when loading room list fails.
	 */
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
	
	//
	// Create room
	//

	/**
	 * Sets loading state when creating a new room.
	 */
	[action.CREATE_ROOM_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	/**
	 * Appends the newly created room to the room list.
	 */
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
	/**
	 * Sets error when room creation fails.
	 */
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

	//
	// Get room by ID
	//

	/**
	 * Sets loading state when fetching a room by ID.
	 */
	[action.ROOM_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	/**
	 * Sets the currently selected room in store.
	 */
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
	/**
	 * Sets error when fetching a room fails.
	 */
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
	
	//
	// Price history
	//

	/**
	 * Sets loading state for fetching room price history.
	 */
	[action.PRICE_HISTORY_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
		error: undefined,
		errorPriceHistory: undefined,
	}),
	/**
	 * Sets the fetched price history for the selected room.
	 */
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
	/**
	 * Sets error state for failed price history request.
	 */
	[action.PRICE_HISTORY_ERROR]: (
		store: RoomsStoreType,
		action: {
			error: unknown,
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		errorPriceHistory: action.error,
	}),

	//
	// Create price entry
	//

	/**
	 * Sets loading state when posting a new price entry.
	 */
	[action.CREATE_PRICE_ENTRY_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
		error: undefined,
		errorPriceHistory: undefined,
	}),
	 /**
	 * Appends the new price entry to the current price history.
	 */
	[action.CREATE_PRICE_ENTRY_OK]: (
		store: RoomsStoreType,
		action: {
			priceEntry: PriceEntry,
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		priceHistory: [
			...store.priceHistory,
			action.priceEntry
		]
	}),
	/**
	 * Sets error state when creating a price entry fails.
	 */
	[action.CREATE_PRICE_ENTRY_ERROR]: (
		store: RoomsStoreType,
		action: {
			error: unknown,
		}
	): RoomsStoreType => ({
		...store,
		loading: false,
		errorPriceHistory: action.error,
	}),
	
	//
	// Occupancy
	//

	/**
	 * Sets loading state for fetching room occupancy info.
	 */
	[action.OCCUPANCY_LOADING]: (store: RoomsStoreType): RoomsStoreType => ({
		...store,
		loading: true,
		error: undefined,
	}),
	/**
	 * Sets the current guest occupying the room.
	 */
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
	/**
	 * Handles error when occupancy fetch fails, resets guest state.
	 */
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

/**
 * Reducer function to manage state for rooms, their metadata, and occupancy.
 *
 * @param store - Current store state for rooms.
 * @param action - Dispatched action with `type` and payload.
 * @returns Updated store state after applying reducer logic.
 */
export const RoomsReducer = (store = RoomInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
