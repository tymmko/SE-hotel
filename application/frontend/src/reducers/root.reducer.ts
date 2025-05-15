import { combineReducers } from '@reduxjs/toolkit'
import { RoomsReducer } from './rooms.reducer';
import authReducer from './auth.reducer';
import { BillsReducer } from './bills.reducer';
import { ReservationReducer } from './reservations.reducer';
import { GuestReducer } from './guests.reducer';
import { EquipmentsReducer } from './equipments.reducer';

/**
 * Combines all feature-specific reducers into a single root reducer.
 *
 * @remarks
 * This is the central reducer used to configure the Redux store.
 * Each key represents a slice of the global state, handled by its corresponding reducer.
 */
const rootReducer = combineReducers({
	authReducer,
	BillsReducer,
	RoomsReducer,
	EquipmentsReducer,
	ReservationReducer,
	GuestReducer,
})

/**
 * The global state type for the Redux store, inferred from the root reducer.
 *
 * @example
 * const rooms = useSelector((state: RootState) => state.RoomsReducer.rooms);
 */
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer