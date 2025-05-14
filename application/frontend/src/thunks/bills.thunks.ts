import { AppDispatch } from '../app/store';
import * as actions from '../actions/bills.actions';
import * as API from '../api/bills.api';

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
