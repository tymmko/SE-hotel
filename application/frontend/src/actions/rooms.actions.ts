import * as constants from '../types/constants';
import { Guest } from '../types/guest';
import { PriceEntry, Room } from '../types/rooms';

//
// Room list actions
//

/**
 * Creates an action indicating that the list of rooms is being loaded.
 *
 * @returns A `ROOMS_LOADING` action.
 */
export const roomsLoading = () => ({
	type: constants.ROOMS_LOADING,
});

/**
 * Creates an action dispatched when the room list loads successfully.
 *
 * @param rooms - An array of `Room` objects.
 * @returns A `ROOMS_OK` action with the rooms payload.
 */
export const roomsOk = (rooms: Room[]) => ({
	type: constants.ROOMS_OK,
	rooms,
});

/**
 * Creates an action dispatched when loading rooms fails.
 *
 * @param error - Error object or message.
 * @returns A `ROOMS_ERROR` action with the error payload.
 */
export const roomsError = (error: unknown) => ({
	type: constants.ROOMS_ERROR,
	error,
});


//
// Create room actions
//

/**
 * Creates an action indicating that a room creation is in progress.
 *
 * @returns A `CREATE_ROOM_LOADING` action.
 */
export const createRoomLoading = () => ({
	type: constants.CREATE_ROOM_LOADING,
});

/**
 * Creates an action dispatched when a new room is successfully created.
 *
 * @param room - The created `Room` object.
 * @returns A `CREATE_ROOM_OK` action with the room payload.
 */
export const createRoomOk = (room: Room) => ({
	type: constants.CREATE_ROOM_OK,
	room,
});

/**
 * Creates an action dispatched when room creation fails.
 *
 * @param error - Error object or message.
 * @returns A `CREATE_ROOM_ERROR` action.
 */
export const createRoomError = (error: unknown) => ({
	type: constants.CREATE_ROOM_ERROR,
	error,
});


//
// Single room actions
//

/**
 * Creates an action indicating that a single room is being loaded.
 *
 * @returns A `ROOM_LOADING` action.
 */
export const roomLoading = () => ({
	type: constants.ROOM_LOADING,
});

/**
 * Creates an action dispatched when a single room is successfully loaded.
 *
 * @param room - The loaded `Room` object.
 * @returns A `ROOM_OK` action with the room payload.
 */
export const roomOk = (room: Room) => ({
	type: constants.ROOM_OK,
	room,
});

/**
 * Creates an action dispatched when loading a room fails.
 *
 * @param error - Error object or message.
 * @returns A `ROOM_ERROR` action.
 */
export const roomError = (error: unknown) => ({
	type: constants.ROOM_ERROR,
	error,
});



//
// Price history actions
//

/**
 * Creates an action indicating that price history data is being loaded.
 *
 * @returns A `PRICE_HISTORY_LOADING` action.
 */
export const priceHistoryLoading = () => ({
	type: constants.PRICE_HISTORY_LOADING,
});

/**
 * Creates an action dispatched when price history data is loaded successfully.
 *
 * @param priceHistory - An array of `Room` objects with historical price entries.
 * @returns A `PRICE_HISTORY_OK` action with the data payload.
 */
export const priceHistoryOk = (priceHistory: PriceEntry[]) => ({
	type: constants.PRICE_HISTORY_OK,
	priceHistory,
});

/**
 * Creates an action dispatched when loading price history fails.
 *
 * @param error - Error object or message.
 * @returns A `PRICE_HISTORY_ERROR` action.
 */
export const priceHistoryError = (error: unknown) => ({
	type: constants.PRICE_HISTORY_ERROR,
	error,
});


//
// Create price entry actions
//

/**
 * Creates an action indicating that a price entry creation is in progress.
 *
 * @returns A `CREATE_PRICE_ENTRY_LOADING` action.
 */
export const createPriceEntryLoading = () => ({
	type: constants.CREATE_PRICE_ENTRY_LOADING,
});

/**
 * Creates an action dispatched when a new price entry is successfully created.
 *
 * @param priceEntry - The created `PriceEntry` object.
 * @returns A `CREATE_PRICE_ENTRY_OK` action with the entry payload.
 */
export const createPriceEntryOk = (priceEntry: PriceEntry) => ({
	type: constants.CREATE_PRICE_ENTRY_OK,
	priceEntry,
});

/**
 * Creates an action dispatched when creating a price entry fails.
 *
 * @param error - Error object or message.
 * @returns A `CREATE_PRICE_ENTRY_ERROR` action.
 */
export const createPriceEntryError = (error: unknown) => ({
	type: constants.CREATE_PRICE_ENTRY_ERROR,
	error,
});


//
// Occupancy actions
//

/**
 * Creates an action indicating that room occupancy information is being loaded.
 *
 * @returns An `OCCUPANCY_LOADING` action.
 */
export const occupancyLoading = () => ({
	type: constants.OCCUPANCY_LOADING,
});

/**
 * Creates an action dispatched when a room's occupancy data is successfully retrieved.
 *
 * @param guest - The `Guest` currently occupying the room.
 * @returns An `OCCUPANCY_OK` action with the guest payload.
 */
export const occupancyOk = (guest: Guest) => ({
	type: constants.OCCUPANCY_OK,
	guest,
});

/**
 * Creates an action dispatched when loading room occupancy fails.
 *
 * @param error - Error object or message.
 * @returns An `OCCUPANCY_ERROR` action.
 */
export const occupancyError = (error: unknown) => ({
	type: constants.OCCUPANCY_ERROR,
	error,
});
