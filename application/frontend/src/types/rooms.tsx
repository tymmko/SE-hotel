export type Room = {
	type: 'single' | 'double' | 'suite';
	isAvailable: boolean;
	price: number;
	roomNumber: number;
};