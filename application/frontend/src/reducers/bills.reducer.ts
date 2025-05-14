import { BillInitialState, BillsStoreType, EmptyBill } from '../types/bills';
import * as action from '../types/constants';

const actionMap = {
    // GET bills
	[action.BILLS_LOADING]: (store: BillsStoreType): BillsStoreType => ({
		...store,
		loading: true,
		error: null,
		bill: EmptyBill,
	}),
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

    // GET bill
    [action.BILL_LOADING]: (store: BillsStoreType): BillsStoreType => ({
		...store,
		loading: true,
		error: null,
	}),
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

export const BillsReducer = (store = BillInitialState, action: any) => {
	if (action.type in actionMap) {
		store = actionMap[action.type as keyof typeof actionMap](store, action);
	}

	return store;
};
