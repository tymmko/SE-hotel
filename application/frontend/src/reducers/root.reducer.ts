import { combineReducers } from '@reduxjs/toolkit'
import { RoomsReducer } from './rooms.reducer';

const rootReducer = combineReducers({
	RoomsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer