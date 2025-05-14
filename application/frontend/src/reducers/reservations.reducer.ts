import { ReservationInitialState, ReservationStatus, ReservationStoreType } from "../types/reservation";
import * as action from '../types/constants';

const actionMap = {
	[action.RESERVATIONS_LOADING]: (store: ReservationStoreType): ReservationStoreType => ({
		...store,
		loading: true,
		error: null,
	}),
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

	// CREATE RESERVATION
	[action.CREATE_RESERVATION_LOADING]: (store: ReservationStoreType): ReservationStoreType => ({
		...store,
		loading: true,
		error: null,
	}),
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

	// GET RESERVATION BY ID
	[action.RESERVATION_LOADING]: (store: ReservationStoreType): ReservationStoreType => ({
		...store,
		loading: true,
		error: null,
	}),
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

	// UPDATE RESERVATION STATUS
	[action.RESERVATION_STATUS_LOADING]: (store: ReservationStoreType): ReservationStoreType => ({
		...store,
		loading: true,
		error: null,
		errorStatus: null,
	}),
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

export const ReservationReducer = (store = ReservationInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
