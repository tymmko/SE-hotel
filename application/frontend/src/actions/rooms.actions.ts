import * as constants from '../types/constants';

export const roomsListLoading = () => ({
	type: constants.ROOMS_LIST_LOADING,
});

export const roomsListOk = (rooms: any[]) => ({
	type: constants.ROOMS_LIST_OK,
	rooms,
});

export const roomsListError = (error: unknown) => ({
	type: constants.ROOMS_LIST_ERROR,
	error,
});


export const createRoomLoading = () => ({
	type: constants.CREATE_ROOM_LOADING,
});

export const createRoomOk = (room: any) => ({
	type: constants.CREATE_ROOM_OK,
	room,
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


export const equipmentLoading = () => ({
	type: constants.EQUIPMENT_LOADING,
});

export const equipmentOk = (equipment: any[]) => ({
	type: constants.EQUIPMENT_OK,
	equipment,
});

export const equipmentError = (error: unknown) => ({
	type: constants.EQUIPMENT_ERROR,
	error,
});