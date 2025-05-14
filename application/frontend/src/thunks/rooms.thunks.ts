import { AppDispatch } from '../app/store';
import * as actions from '../actions/rooms.actions';
import * as API from '../api/rooms.api';
import { PriceEntry, Room } from '../types/rooms';

export const fetchRooms = () => async (dispatch: AppDispatch) => {
	dispatch(actions.roomsLoading());

	try {
		const rooms = await API.getRooms();
		dispatch(actions.roomsOk(rooms));
	} catch (err) {
		dispatch(actions.roomsError(err));
	}
};

export const createRoom = (room: Omit<Room, 'id'>) => async (dispatch: AppDispatch) => {
	dispatch(actions.createRoomLoading());

	try {
		const newRoom = await API.postRoom(room);
		dispatch(actions.createRoomOk(newRoom));
	} catch (err) {
		dispatch(actions.createRoomError(err));
	}
};


export const fetchRoomById = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.roomLoading());
	try {
		const room = await API.getRoomById(id);
		dispatch(actions.roomOk(room));
	} catch (err) {
		dispatch(actions.roomError(err));
	}
};

export const fetchPriceHistory = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.priceHistoryLoading());
	try {
		const priceHistory = await API.getPriceHistory(id);
		dispatch(actions.priceHistoryOk(priceHistory));
	} catch (err) {
		dispatch(actions.priceHistoryError(err));
	}
};

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

export const fetchOccupancy = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.occupancyLoading());
	try {
		const occupancy = await API.getOccupancy(id);
		dispatch(actions.occupancyOk(occupancy));
	} catch (err) {
		dispatch(actions.occupancyError(err));
	}
};

