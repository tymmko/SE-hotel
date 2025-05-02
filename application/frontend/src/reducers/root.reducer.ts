import { combineReducers } from '@reduxjs/toolkit'
import { RoomsReducer } from './rooms.reducer';
import authReducer from './auth.reducer';

const rootReducer = combineReducers({
	RoomsReducer,
	authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer