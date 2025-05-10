import {
    AMENITIES_LOADING, AMENITIES_OK, AMENITIES_ERROR
  } from '../actions/amenities.actions';
  import { AmenitiesAction } from '../actions/amenities.actions';
  import { Amenity } from '../types/amenity';
  
  interface AmenitiesState {
    loading: boolean;
    error:   any;
    list:    Amenity[];
  }
  
  const initialState: AmenitiesState = {
    loading: false,
    error:   null,
    list:    [],
  };
  
  export function amenitiesReducer(
    state = initialState,
    action: AmenitiesAction
  ): AmenitiesState {
    switch (action.type) {
      case AMENITIES_LOADING:
        return { ...state, loading: true, error: null };
      case AMENITIES_OK:
        return { loading: false, error: null, list: action.payload };
      case AMENITIES_ERROR:
        return { loading: false, error: action.error, list: [] };
      default:
        return state;
    }
  }
  