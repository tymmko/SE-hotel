import { configureStore } from '@reduxjs/toolkit'

import rootReducer from '../reducers/root.reducer'

/**
 * Configures and creates the Redux store using the application's root reducer.
 *
 * @remarks
 * This store combines all reducer slices into a single state tree and is
 * used across the entire frontend app via the Redux Provider.
 */
const store = configureStore({
	reducer: rootReducer,
})

/**
 * The root state type inferred from the store's current state shape.
 *
 * @example
 * const rooms = useSelector((state: RootState) => state.rooms.list);
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * The application's typed dispatch function for dispatching actions and thunks.
 *
 * @example
 * const dispatch = useDispatch<AppDispatch>();
 */
export type AppDispatch = typeof store.dispatch;

export default store;