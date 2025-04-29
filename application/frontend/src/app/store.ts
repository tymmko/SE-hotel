import { configureStore, Action } from '@reduxjs/toolkit'

import rootReducer, { RootState } from '../reducers/root.reducer'

const store = configureStore({
	reducer: rootReducer,
})

export default store;