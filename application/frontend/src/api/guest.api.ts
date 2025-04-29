import axios from 'axios';
import { Dispatch } from 'redux';
import { guestLoading, guestOk, guestError } from '../actions/guest.actions';
import { Guest } from '../types/guest';

export const fetchGuest = (guestId: number) => async (dispatch: Dispatch) => {
  dispatch(guestLoading());
  try {
    const response = await axios.get<Guest>(`/api/guests/${guestId}`);
    dispatch(guestOk(response.data));
  } catch (error) {
    dispatch(guestError(error));
  }
};
