import * as constants from '../services/constants';

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