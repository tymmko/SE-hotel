
import MockAdapter from 'axios-mock-adapter';
import api from '../../api/api';
import * as thunks from '../../thunks/bills.thunks';
import * as actions from '../../actions/bills.actions';
import * as URL from '../../api/url';
import { Bill } from '../../types/bills';
import { createMockStore } from '../utils/mockStore';

describe('bills thunks', () => {
	const mockAxios = new MockAdapter(api);

	beforeEach(() => {
		mockAxios.reset();
	});

	it('fetchBills dispatches BILLS_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const bills: Bill[] = [
			{ id: '1', total_amount: 200.0, status: 'paid', stay_id: '1' }
		];
		mockAxios.onGet(URL.URL.bills).reply(200, { bills });

		await (thunks.fetchBills() as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.billsLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.billsOk(bills));
	});

	it('fetchBillById dispatches BILL_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const bill: Bill = { id: '1', total_amount: 200.0, status: 'paid', stay_id: '1' };
		mockAxios.onGet(URL.URL.bill(1)).reply(200, { bill });

		await (thunks.fetchBillById('1') as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.billLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.billOk(bill));
	});
});
