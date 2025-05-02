import { combineReducers } from '@reduxjs/toolkit'
import { RoomsReducer } from './rooms.reducer';
import { ReservationReducer } from './reservations.reducer';
import { GuestReducer } from './guests.reducer';

const rootReducer = combineReducers({
	RoomsReducer,
	ReservationReducer,
	GuestReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer