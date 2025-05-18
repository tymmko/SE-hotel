import { Equipment } from './equipments';
import { emptyGuest, Guest } from './guest';

/**
 * Initial state for the room reducer.
 */
export const RoomInitialState: RoomsStoreType = {
	rooms: [],
	room: {
		id: 0,
		type: 'single',
		status: 'occupied'
	},
	priceHistory: [],
	equipments: [],
	guest: emptyGuest,
	error: null,
	errorPriceHistory: null,
	loading: false
};

/**
 * Redux state shape for room-related data.
 */
export type RoomsStoreType = {
	rooms : Room[],
	room: Room,
	error: unknown | null,
	errorPriceHistory: unknown | null,
	loading: boolean,
	priceHistory: PriceEntry[],
	equipments: Equipment[],
	guest: Guest,
}

/**
 * Represents a room in the hotel.
 */
export type Room = {
	id: number,
	type: 'single' | 'double' | 'suite';
	status: 'occupied' | 'available';
	price_per_night?: number;
	capacity?: number; 
};

/**
 * Represents the price history entry of a room.
 */
export type PriceEntry = {
	price_history_id?: number,
	start_date: string,
	end_date: string,
	price: number,
	room_id: number,
}
