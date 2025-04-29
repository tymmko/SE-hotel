import {
    RESERVATIONS_LOADING, RESERVATIONS_OK, RESERVATIONS_ERROR,
    RESERVATION_CREATE_LOADING, RESERVATION_CREATE_OK, RESERVATION_CREATE_ERROR
  } from '../actions/reservations.actions';
  import { ReservationsAction } from '../actions/reservations.actions';
  import { Reservation } from '../types/reservation';
  
  interface ReservationsState {
    list:        Reservation[];
    loading:     boolean;
    error:       any;
    creating:    boolean;
    createError: any;
  }
  
  const initialState: ReservationsState = {
    list:        [],
    loading:     false,
    error:       null,
    creating:    false,
    createError: null,
  };
  
  export function reservationsReducer(
    state = initialState,
    action: ReservationsAction
  ): ReservationsState {
    switch (action.type) {
      case RESERVATIONS_LOADING:
        return { ...state, loading: true, error: null };
      case RESERVATIONS_OK:
        return { ...state, loading: false, list: action.payload };
      case RESERVATIONS_ERROR:
        return { ...state, loading: false, error: action.error };
      case RESERVATION_CREATE_LOADING:
        return { ...state, creating: true, createError: null };
      case RESERVATION_CREATE_OK:
        return { 
          ...state,
          creating: false,
          list: [...state.list, action.payload]
        };
      case RESERVATION_CREATE_ERROR:
        return { ...state, creating: false, createError: action.error };
      default:
        return state;
    }
  }
  