import * as constants from '../types/constants';

export const billsLoading = () => ({
	type: constants.BILLS_LOADING,
});

export const billsOk = (bills: any[]) => ({
	type: constants.BILLS_OK,
	bills,
});

export const billsError = (error: unknown) => ({
	type: constants.BILLS_ERROR,
	error,
});

export const billLoading = () => ({
	type: constants.BILL_LOADING,
});

export const billOk = (bill: any) => ({
	type: constants.BILL_OK,
	bill,
});

export const billError = (error: unknown) => ({
	type: constants.BILL_ERROR,
	error,
});