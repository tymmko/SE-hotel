import { Guest } from './guest';

export type RoomsStoreType = {
	roomsList : Room[],
	room: Room,
	error: unknown | null,
	loading: boolean,
	priceHistory: PriceEntry[],
	equipment: Equipment[],
	guest: Guest,
}

export type Room = {
	id: number,
	type: 'single' | 'double' | 'suite';
	status: 'occupied' | 'available';
	price_per_night?: number;
	capacity?: number; 
};

export type PriceEntry = {
	price_history_id?: number,
	start_date: string,
	end_date: string,
	price: number,
	room_id: number,
}

export type Equipment = {
	id: number,
    name: string,
    price: number,
    room_id: number,
};
