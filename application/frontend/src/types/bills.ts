/**
 * Represents a single bill entity.
 */
export const EmptyBill: Bill = {
	id: '0',
	total_amount: 0,
	status: 'unpaid',
	stay_id: '0',
};

/**
 * Represents the shape of the Redux store slice for bills.
 */
export const BillInitialState: BillsStoreType = {
	bills: [],
	bill: EmptyBill,
	error: null,
	loading: false
};

/**
 * A placeholder empty bill used for initialization.
 */
export type BillsStoreType = {
	bills : Bill[],
	bill: Bill,
	error: unknown | null,
	loading: boolean,
};

/**
 * Initial state of the bills slice in the Redux store.
 */
export type Bill = {
    id: string,
	total_amount: number,
	status: 'paid' | 'unpaid',
	stay_id: string,
}
