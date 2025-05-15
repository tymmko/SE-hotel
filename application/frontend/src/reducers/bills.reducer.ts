import { BillInitialState, BillsStoreType, EmptyBill } from '../types/bills';
import * as action from '../types/constants';

/**
 * A map of action types to reducer functions that handle each state update
 * for the `bills` feature.
 *
 * @remarks
 * This manual reducer map approach allows explicit control over logic per action type,
 * outside of Redux Toolkit's `createSlice`.
 */
const actionMap = {
	// === Load all bills ===

	/**
	 * Sets loading state for fetching all bills.
	 */
	[action.BILLS_LOADING]: (store: BillsStoreType): BillsStoreType => ({
		...store,
		loading: true,
		error: null,
		bill: EmptyBill,
	}),
	/**
	 * Sets the fetched list of bills in state.
	 */
	[action.BILLS_OK]: (
		store: BillsStoreType,
		action: {
			bills: BillsStoreType['bills'],
		}
	): BillsStoreType => ({
		...store,
		loading: false,
		bills: action.bills,
	}),
	/**
	 * Sets an error after failing to fetch bills.
	 */
	[action.BILLS_ERROR]: (
		store: BillsStoreType,
		action: {
			error: unknown,
		}
	): BillsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	}),

	// === Load a single bill ===

	/**
	 * Sets loading state for fetching a single bill.
	 */
	[action.BILL_LOADING]: (store: BillsStoreType): BillsStoreType => ({
		...store,
		loading: true,
		error: null,
	}),
	/**
	 * Sets the fetched single bill in state.
	 */
	[action.BILL_OK]: (
		store: BillsStoreType,
		action: {
			bill: BillsStoreType['bill'],
		}
	): BillsStoreType => ({
		...store,
		loading: false,
		bill: action.bill,
	}),
	 /**
	 * Sets an error after failing to fetch a single bill.
	 */
	[action.BILL_ERROR]: (
		store: BillsStoreType,
		action: {
			error: unknown,
		}
	): BillsStoreType => ({
		...store,
		loading: false,
		error: action.error,
	})
}

/**
 * The reducer function for the `bills` slice of state.
 *
 * @param store - The current state of the bills store.
 * @param action - The dispatched action with a `type` and optional payload.
 * @returns The updated `BillsStoreType` state based on the action type.
 *
 * @example
 * const newState = BillsReducer(state, { type: BILLS_OK, bills: [...] });
 */
export const BillsReducer = (store = BillInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
