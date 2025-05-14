import * as constants from '../types/constants';

export const roomsLoading = () => ({
	type: constants.ROOMS_LOADING,
});

export const roomsOk = (rooms: any[]) => ({
	type: constants.ROOMS_OK,
	rooms,
});

export const roomsError = (error: unknown) => ({
	type: constants.ROOMS_ERROR,
	error,
});


export const createRoomLoading = () => ({
	type: constants.CREATE_ROOM_LOADING,
});

export const createRoomOk = (priceEntry: any) => ({
	type: constants.CREATE_ROOM_OK,
	priceEntry,
});

export const createRoomError = (error: unknown) => ({
	type: constants.CREATE_ROOM_ERROR,
	error,
});


export const roomLoading = () => ({
	type: constants.ROOM_LOADING,
});

export const roomOk = (room: any) => ({
	type: constants.ROOM_OK,
	room,
});

export const roomError = (error: unknown) => ({
	type: constants.ROOM_ERROR,
	error,
});


export const priceHistoryLoading = () => ({
	type: constants.PRICE_HISTORY_LOADING,
});

export const priceHistoryOk = (priceHistory: any[]) => ({
	type: constants.PRICE_HISTORY_OK,
	priceHistory,
});

export const priceHistoryError = (error: unknown) => ({
	type: constants.PRICE_HISTORY_ERROR,
	error,
});


export const createPriceEntryLoading = () => ({
	type: constants.CREATE_PRICE_ENTRY_LOADING,
});

export const createPriceEntryOk = (priceEntry: any) => ({
	type: constants.CREATE_PRICE_ENTRY_OK,
	priceEntry,
});

export const createPriceEntryError = (error: unknown) => ({
	type: constants.CREATE_PRICE_ENTRY_ERROR,
	error,
});


export const occupancyLoading = () => ({
	type: constants.OCCUPANCY_LOADING,
});

export const occupancyOk = (guest: any) => ({
	type: constants.OCCUPANCY_OK,
	guest,
});

export const occupancyError = (error: unknown) => ({
	type: constants.OCCUPANCY_ERROR,
	error,
});
