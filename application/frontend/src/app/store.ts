import { configureStore, Action } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';

import rootReducer, { RootState } from '../reducers/root.reducer'

const store = configureStore({
	reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;