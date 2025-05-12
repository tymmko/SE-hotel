import api from './api';
import { Dispatch } from 'redux';
import { amenitiesLoading, amenitiesOk, amenitiesError } from '../actions/amenities.actions';
import { Amenity } from '../types/amenity';

export const fetchAmenitiesByRoom = (roomId: number) => async (dispatch: Dispatch) => {
	dispatch(amenitiesLoading());
	try {
		const response = await api.get<Amenity[]>(`/api/rooms/${roomId}/amenities`);
		dispatch(amenitiesOk(response.data));
	} catch (error) {
		dispatch(amenitiesError(error));
	}
};
