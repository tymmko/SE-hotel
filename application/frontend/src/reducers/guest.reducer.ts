import {
    GUEST_LOADING, GUEST_OK, GUEST_ERROR
  } from '../actions/guest.actions';
  import { GuestAction } from '../actions/guest.actions';
  import { Guest } from '../types/guest';
  
  interface GuestState {
    loading: boolean;
    error: any;
    data: Guest | null;
  }
  
  const initialState: GuestState = {
    loading: false,
    error:   null,
    data:    null,
  };
  
  export function guestReducer(
    state = initialState,
    action: GuestAction
  ): GuestState {
    switch (action.type) {
      case GUEST_LOADING: return { ...state, loading: true, error: null };
      case GUEST_OK:      return { loading: false, error: null, data: action.payload };
      case GUEST_ERROR:   return { loading: false, error: action.error, data: null };
      default:            return state;
    }
  }
  