import { AppDispatch } from '../app/store';
import * as actions from '../actions/rooms.actions';
import { getEquipment, getPriceHistory, getRoomById, getRooms, postRoom } from '../api/rooms.api';
import { Room } from '../types/rooms';

export const fetchRooms = () => async (dispatch: AppDispatch) => {
	dispatch(actions.roomsListLoading());

	try {
		const rooms = await getRooms();
		dispatch(actions.roomsListOk(rooms));
	} catch (err) {
		dispatch(actions.roomsListError(err));
	}
};

export const createRoom = (room: Omit<Room, 'id'>) => async (dispatch: AppDispatch) => {
	dispatch(actions.createRoomLoading());

	try {
		const rooms = await postRoom(room);
		dispatch(actions.createRoomOk(rooms));
	} catch (err) {
		dispatch(actions.createRoomError(err));
	}
};


export const fetchRoomById = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.roomLoading());
	try {
		const room = await getRoomById(id);
		dispatch(actions.roomOk(room));
	} catch (err) {
		dispatch(actions.roomError(err));
	}
};

export const fetchPriceHistory = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.priceHistoryLoading());
	try {
		const priceHistory = await getPriceHistory(id);
		dispatch(actions.priceHistoryOk(priceHistory));
	} catch (err) {
		dispatch(actions.priceHistoryError(err));
	}
};

export const fetchEquiment = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.equipmentLoading());
	try {
		const equipment = await getEquipment(id);
		dispatch(actions.equipmentOk(equipment));
	} catch (err) {
		dispatch(actions.equipmentError(err));
	}
};
