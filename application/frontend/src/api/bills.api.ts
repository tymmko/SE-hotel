import api from './api';
import { URL } from './url';
import { Bill } from '../types/bills';

// GET bills
export const getBills = async (): Promise<Bill[]> => {
	const response = await api.get(URL.bills);
	return response.data.bills;
};

// GET bill by id
export const getBillById = async (id: string): Promise<Bill> => {
	const response = await api.get(URL.bill(id));
	return response.data.bill;
};