import { AppDispatch } from '../app/store';
import * as actions from '../actions/bills.actions';
import * as API from '../api/bills.api';

/**
 * Thunk for fetching all bills from the API and updating the Redux store.
 *
 * @remarks
 * - Dispatches `billsLoading` before the request.
 * - On success, dispatches `billsOk` with the retrieved bills.
 * - On error, dispatches `billsError` with a descriptive message.
 *
 * @example
 * ```ts
 * dispatch(fetchBills());
 * ```
 */
export const fetchBills = () => async (dispatch: AppDispatch) => {
	dispatch(actions.billsLoading());

	try {
		const bills = await API.getBills();
		dispatch(actions.billsOk(bills));
	} catch (err: any) {
		const message = err?.response?.data?.message || err?.message || 'Unexpected error';
		dispatch(actions.billsError(message));
	}
};

/**
 * Thunk for fetching a single bill by ID from the API and updating the Redux store.
 *
 * @param id - The ID of the bill to fetch.
 *
 * @remarks
 * - Dispatches `billLoading` before the request.
 * - On success, dispatches `billOk` with the retrieved bill.
 * - On error, dispatches `billError` with a descriptive message.
 *
 * @example
 * ```ts
 * dispatch(fetchBillById('abc123'));
 * ```
 */
export const fetchBillById = (id: string) => async (dispatch: AppDispatch) => {
	dispatch(actions.billLoading());
	try {
		const bill = await API.getBillById(id);
		dispatch(actions.billOk(bill));
	} catch (err: any) {
		const message = err?.response?.data?.message || err?.message || 'Unexpected error';
		dispatch(actions.billError(message));
	}
};
