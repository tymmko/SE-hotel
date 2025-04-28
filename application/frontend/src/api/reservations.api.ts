import axios from 'axios';
import { Dispatch } from 'redux';
import {
  reservationsLoading,
  reservationsOk,
  reservationsError,
  reservationCreateLoading,
  reservationCreateOk,
  reservationCreateError
} from '../actions/reservations.actions';
import { Reservation, NewReservation } from '../types/reservation';

export const fetchReservations = () => async (dispatch: Dispatch) => {
  dispatch(reservationsLoading());
  try {
    const response = await axios.get<Reservation[]>('/api/reservations');
    dispatch(reservationsOk(response.data));
  } catch (error) {
    dispatch(reservationsError(error));
  }
};

export const createReservation = (payload: NewReservation) => async (dispatch: Dispatch) => {
  dispatch(reservationCreateLoading());
  try {
    const response = await axios.post<Reservation>('/api/reservations', payload);
    dispatch(reservationCreateOk(response.data));
  } catch (error) {
    dispatch(reservationCreateError(error));
  }
};
