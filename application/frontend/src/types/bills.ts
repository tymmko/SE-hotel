export const EmptyBill: Bill = {
	id: '0',
	total_amount: 0,
	status: 'unpaid',
	stay_id: '0',
};

export const BillInitialState: BillsStoreType = {
	bills: [],
	bill: EmptyBill,
	error: null,
	loading: false
};

export type BillsStoreType = {
	bills : Bill[],
	bill: Bill,
	error: unknown | null,
	loading: boolean,
};

export type Bill = {
    id: string,
	total_amount: number,
	status: 'paid' | 'unpaid',
	stay_id: string,
}