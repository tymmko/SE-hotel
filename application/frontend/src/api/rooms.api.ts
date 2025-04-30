import axios from 'axios';
import { Dispatch } from 'redux';
import { roomsListLoading, roomsListOk, roomsListError } from '../actions/rooms.actions';

export const fetchRooms = () => async (dispatch: Dispatch) => {
	dispatch(roomsListLoading());

	try {
		const response = await axios.get('/api/rooms');
		dispatch(roomsListOk(response.data.rooms));
	} catch (error) {
		dispatch(roomsListError(error));
	}
};
