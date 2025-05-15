import api from './api';
import { URL } from './url';
import { Bill } from '../types/bills';

/**
 * Fetches the list of all bills from the backend.
 *
 * @returns A promise that resolves to an array of `Bill` objects.
 *
 * @example
 * const bills = await getBills();
 * console.log(bills[0].amount);
 */
export const getBills = async (): Promise<Bill[]> => {
	const response = await api.get(URL.bills);
	return response.data.bills;
};

/**
 * Fetches a specific bill by its ID.
 *
 * @param id - The unique identifier of the bill.
 * @returns A promise that resolves to a `Bill` object.
 *
 * @example
 * const bill = await getBillById("12345");
 * console.log(bill.status);
 */
export const getBillById = async (id: string): Promise<Bill> => {
	const response = await api.get(URL.bill(id));
	return response.data.bill;
};