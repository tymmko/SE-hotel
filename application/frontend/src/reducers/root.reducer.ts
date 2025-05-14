import { combineReducers } from '@reduxjs/toolkit'
import { RoomsReducer } from './rooms.reducer';
import authReducer from './auth.reducer';
import { BillsReducer } from './bills.reducer';
import { ReservationReducer } from './reservations.reducer';
import { GuestReducer } from './guests.reducer';
import { EquipmentsReducer } from './equipments.reducer';

const rootReducer = combineReducers({
	authReducer,
	BillsReducer,
	RoomsReducer,
	EquipmentsReducer,
	ReservationReducer,
	GuestReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer