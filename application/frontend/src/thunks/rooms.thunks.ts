import { AppDispatch } from '../app/store';
import * as actions from '../actions/rooms.actions';
import * as API from '../api/rooms.api';
import { PriceEntry, Room } from '../types/rooms';

/**
 * Thunk for fetching all rooms from the API.
 *
 * @remarks
 * Dispatches `roomsLoading`, then:
 * - `roomsOk` with data on success
 * - `roomsError` on failure
 *
 * @example
 * ```ts
 * dispatch(fetchRooms());
 * ```
 */
export const fetchRooms = () => async (dispatch: AppDispatch) => {
	dispatch(actions.roomsLoading());

	try {
		const rooms = await API.getRooms();
		dispatch(actions.roomsOk(rooms));
	} catch (err) {
		dispatch(actions.roomsError(err));
	}
};

/**
 * Thunk for creating a new room.
 *
 * @param room - The room details, excluding `id`.
 *
 * @remarks
 * Dispatches `createRoomLoading`, then:
 * - `createRoomOk` with the new room
 * - `createRoomError` on failure
 *
 * @example
 * ```ts
 * dispatch(createRoom({ number: 101, type: 'double', price: 100 }));
 * ```
 */
export const createRoom = (room: Omit<Room, 'id'>) => async (dispatch: AppDispatch) => {
	dispatch(actions.createRoomLoading());

	try {
		const newRoom = await API.postRoom(room);
		dispatch(actions.createRoomOk(newRoom));
	} catch (err) {
		dispatch(actions.createRoomError(err));
	}
};

/**
 * Thunk for fetching a room by its ID.
 *
 * @param id - The ID of the room to fetch.
 *
 * @example
 * ```ts
 * dispatch(fetchRoomById(12));
 * ```
 */
export const fetchRoomById = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.roomLoading());
	try {
		const room = await API.getRoomById(id);
		dispatch(actions.roomOk(room));
	} catch (err) {
		dispatch(actions.roomError(err));
	}
};

/**
 * Thunk for fetching a room's full price history.
 *
 * @param id - The ID of the room.
 *
 * @example
 * ```ts
 * dispatch(fetchPriceHistory(3));
 * ```
 */
export const fetchPriceHistory = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.priceHistoryLoading());
	try {
		const priceHistory = await API.getPriceHistory(id);
		dispatch(actions.priceHistoryOk(priceHistory));
	} catch (err) {
		dispatch(actions.priceHistoryError(err));
	}
};

/**
 * Thunk for creating a new price history entry for a room.
 *
 * @param id - The room ID.
 * @param priceEntry - The new price data excluding the room ID.
 *
 * @remarks
 * Dispatches `createPriceEntryLoading`, then:
 * - `createPriceEntryOk` with the new entry
 * - `createPriceEntryError` on failure
 *
 * @example
 * ```ts
 * dispatch(createPriceEntry(3, { price: 120, from: '2024-01-01', to: '2024-06-30' }));
 * ```
 */
export const createPriceEntry = (id: string | number, priceEntry: Omit<PriceEntry, 'room_id'>) => async (dispatch: AppDispatch) => {
	dispatch(actions.createPriceEntryLoading());

	try {
		const newEntry = await API.postPriceEntry(id, priceEntry);
		dispatch(actions.createPriceEntryOk(newEntry));
	} catch (err: any) {
		const message = err?.response?.data?.message || err?.message || 'Unexpected error';
		dispatch(actions.createPriceEntryError({ message }));
	}
};


/**
 * Thunk for fetching current guest occupancy for a room.
 *
 * @param id - The ID of the room.
 *
 * @example
 * ```ts
 * dispatch(fetchOccupancy(9));
 * ```
 */
export const fetchOccupancy = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.occupancyLoading());
	try {
		const occupancy = await API.getOccupancy(id);
		dispatch(actions.occupancyOk(occupancy));
	} catch (err) {
		dispatch(actions.occupancyError(err));
	}
};

