import { Bill } from '../types/bills';
import * as constants from '../types/constants';

/**
 * Creates an action indicating that bills are currently being loaded.
 *
 * @returns A `BILLS_LOADING` action.
 */
export const billsLoading = () => ({
	type: constants.BILLS_LOADING,
});

/**
 * Creates an action dispatched when bills are successfully loaded.
 *
 * @param bills - An array of bill objects retrieved from the backend.
 * @returns A `BILLS_OK` action containing the bills payload.
 */
export const billsOk = (bills: Bill[]) => ({
	type: constants.BILLS_OK,
	bills,
});

/**
 * Creates an action dispatched when loading bills fails.
 *
 * @param error - An error object or message describing the failure.
 * @returns A `BILLS_ERROR` action containing the error payload.
 */
export const billsError = (error: unknown) => ({
	type: constants.BILLS_ERROR,
	error,
});

/**
 * Creates an action indicating that a single bill is currently being loaded.
 *
 * @returns A `BILL_LOADING` action.
 */
export const billLoading = () => ({
	type: constants.BILL_LOADING,
});

/**
 * Creates an action dispatched when a specific bill is successfully loaded.
 *
 * @param bill - The bill object retrieved from the backend.
 * @returns A `BILL_OK` action containing the bill payload.
 */
export const billOk = (bill: Bill) => ({
	type: constants.BILL_OK,
	bill,
});

/**
 * Creates an action dispatched when loading a specific bill fails.
 *
 * @param error - An error object or message describing the failure.
 * @returns A `BILL_ERROR` action containing the error payload.
 */
export const billError = (error: unknown) => ({
	type: constants.BILL_ERROR,
	error,
});