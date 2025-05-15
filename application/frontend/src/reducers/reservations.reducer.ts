import { ReservationInitialState, ReservationStatus, ReservationStoreType } from "../types/reservation";
import * as action from '../types/constants';

/**
 * A mapping of reservation-related action types to reducer handlers.
 *
 * @remarks
 * This reducer manages the reservation list, single reservation view,
 * creation status, and reservation status updates.
 */
const actionMap = {
	//
	// Fetch all reservations
	//

	/**
	 * Sets the store to loading state for fetching all reservations.
	 */
	[action.RESERVATIONS_LOADING]: (store: ReservationStoreType): ReservationStoreType => ({
		...store,
		loading: true,
		error: null,
	}),
	/**
	 * Updates the store with the list of fetched reservations.
	 */
	[action.RESERVATIONS_OK]: (
		store: ReservationStoreType,
		action: {
			reservations: ReservationStoreType['reservations'],
		}
	): ReservationStoreType => ({
		...store,
		loading: false,
		reservations: action.reservations,
	}),
	 /**
	 * Sets an error when fetching reservations fails.
	 */
	[action.RESERVATIONS_ERROR]: (
		store: ReservationStoreType,
		action: {
			error: unknown,
		}
	): ReservationStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),

	//
	// Create reservation
	//

	/**
	 * Sets the store to loading state for creating a new reservation.
	 */
	[action.CREATE_RESERVATION_LOADING]: (store: ReservationStoreType): ReservationStoreType => ({
		...store,
		loading: true,
		error: null,
	}),
	/**
	 * Adds the newly created reservation to the list.
	 */
	[action.CREATE_RESERVATION_OK]: (
		store: ReservationStoreType,
		action: {
			reservation: ReservationStoreType['reservation'],
		}
	): ReservationStoreType => ({
		...store,
		loading: false,
		reservations: [
			...store.reservations,
			action.reservation,
		],
	}),
	/**
	 * Sets an error when creating a reservation fails.
	 */
	[action.CREATE_RESERVATION_ERROR]: (
		store: ReservationStoreType,
		action: {
			error: unknown,
		}
	): ReservationStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),

	//
	// Fetch a reservation by ID
	//

	/**
	 * Sets the store to loading state for fetching a reservation by ID.
	 */
	[action.RESERVATION_LOADING]: (store: ReservationStoreType): ReservationStoreType => ({
		...store,
		loading: true,
		error: null,
	}),
	/**
	 * Updates the store with the loaded reservation.
	 */
	[action.RESERVATION_OK]: (
		store: ReservationStoreType,
		action: {
			reservation: ReservationStoreType['reservation'],
		}
	): ReservationStoreType => ({
		...store,
		loading: false,
		reservation: action.reservation
	}),
	/**
	 * Sets an error when loading a reservation fails.
	 */
	[action.RESERVATION_ERROR]: (
		store: ReservationStoreType,
		action: {
			error: unknown,
		}
	): ReservationStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),

	//
	// Update reservation status
	//

	/**
	 * Sets loading state for updating reservation status.
	 */
	[action.RESERVATION_STATUS_LOADING]: (store: ReservationStoreType): ReservationStoreType => ({
		...store,
		loading: true,
		error: null,
		errorStatus: null,
	}),
	/**
	 * Updates the reservation status both in the list and single item view.
	 */
	[action.RESERVATION_STATUS_OK]: (
		store: ReservationStoreType,
		action: {
			reservation: ReservationStoreType['reservation'],
		}
	): ReservationStoreType => ({
		...store,
		loading: false,
		errorStatus: null,
		reservation: action.reservation,
		reservations: store.reservations.map((re) =>
			re.id === action.reservation.id ? action.reservation : re
		),
	}),
	/**
	 * Sets an error for reservation status update.
	 */
	[action.RESERVATION_STATUS_ERROR]: (
		store: ReservationStoreType,
		action: {
			error: unknown,
		}
	): ReservationStoreType => ({
		...store,
		loading: false,
		errorStatus: action.error,
	}),
}

/**
 * Reducer function for managing reservation-related state.
 *
 * @param store - Current reservation store state.
 * @param action - Redux action with `type` and optional payload.
 * @returns The updated `ReservationStoreType` state.
 *
 * @example
 * const updatedState = ReservationReducer(state, { type: RESERVATION_OK, reservation });
 */
export const ReservationReducer = (store = ReservationInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
