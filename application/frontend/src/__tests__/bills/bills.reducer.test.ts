import { BillsReducer } from '../../reducers/bills.reducer';
import * as action from '../../types/constants';
import { EmptyBill } from '../../types/bills';

const mockBill = {
	bill_id: 1,
	total_amount: 100,
	status: 'Paid',
	stay_id: 1
};

describe('BillsReducer', () => {
	it('handles BILLS_LOADING', () => {
		const newState = BillsReducer(undefined, { type: action.BILLS_LOADING });
		expect(newState.loading).toBe(true);
		expect(newState.error).toBeNull();
		expect(newState.bill).toEqual(EmptyBill);
	});

	it('handles BILLS_OK', () => {
		const bills = [mockBill];
		const newState = BillsReducer(undefined, { type: action.BILLS_OK, bills });
		expect(newState.loading).toBe(false);
		expect(newState.bills).toEqual(bills);
	});

	it('handles BILLS_ERROR', () => {
		const error = 'Failed to fetch';
		const newState = BillsReducer(undefined, { type: action.BILLS_ERROR, error });
		expect(newState.loading).toBe(false);
		expect(newState.error).toBe(error);
	});

	it('handles BILL_LOADING', () => {
		const newState = BillsReducer(undefined, { type: action.BILL_LOADING });
		expect(newState.loading).toBe(true);
		expect(newState.error).toBeNull();
	});

	it('handles BILL_OK', () => {
		const newState = BillsReducer(undefined, { type: action.BILL_OK, bill: mockBill });
		expect(newState.loading).toBe(false);
		expect(newState.bill).toEqual(mockBill);
	});

	it('handles BILL_ERROR', () => {
		const error = 'Bill not found';
		const newState = BillsReducer(undefined, { type: action.BILL_ERROR, error });
		expect(newState.loading).toBe(false);
		expect(newState.error).toBe(error);
	});
});
