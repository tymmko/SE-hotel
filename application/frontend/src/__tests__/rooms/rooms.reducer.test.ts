// rooms.reducer.test.ts
import { RoomsReducer } from '../../reducers/rooms.reducer';
import * as constants from '../../types/constants';
import { RoomInitialState } from '../../types/rooms';

const sampleRoom = {
	id: 1,
	type: 'double',
	status: 'available',
	capacity: 2,
	price_per_night: 120,
};

describe('RoomsReducer', () => {
	it('should return the initial state by default', () => {
		expect(RoomsReducer(undefined, { type: '@@INIT' })).toEqual(RoomInitialState);
	});

	it('should handle ROOMS_LOADING', () => {
		const newState = RoomsReducer(RoomInitialState, { type: constants.ROOMS_LOADING });
		expect(newState.loading).toBe(true);
		expect(newState.error).toBeUndefined();
	});

	it('should handle ROOMS_OK', () => {
		const newState = RoomsReducer(RoomInitialState, {
			type: constants.ROOMS_OK,
			rooms: [sampleRoom],
		});
		expect(newState.rooms).toHaveLength(1);
		expect(newState.rooms[0]).toEqual(sampleRoom);
		expect(newState.loading).toBe(false);
	});

	it('should handle ROOMS_ERROR', () => {
		const error = { message: 'Failed to fetch rooms' };
		const newState = RoomsReducer(RoomInitialState, {
			type: constants.ROOMS_ERROR,
			error,
		});
		expect(newState.error).toEqual(error);
		expect(newState.loading).toBe(false);
	});

	it('should handle CREATE_ROOM_OK', () => {
		const newState = RoomsReducer(RoomInitialState, {
			type: constants.CREATE_ROOM_OK,
			room: sampleRoom,
		});
		expect(newState.rooms).toContainEqual(sampleRoom);
	});

	it('should handle ROOM_OK', () => {
		const newState = RoomsReducer(RoomInitialState, {
			type: constants.ROOM_OK,
			room: sampleRoom,
		});
		expect(newState.room).toEqual(sampleRoom);
	});

	it('should handle PRICE_HISTORY_OK', () => {
		const newState = RoomsReducer(RoomInitialState, {
			type: constants.PRICE_HISTORY_OK,
			priceHistory: [
			{
				price_history_id: 1,
				room_id: 1,
				price: 100,
				start_date: '2025-01-01',
				end_date: '2025-12-31',
			},
			],
		});
		expect(newState.priceHistory).toHaveLength(1);
	});

	it('should handle OCCUPANCY_OK', () => {
		const guest = {
			guest_id: 1,
			first_name: 'Jane',
			last_name: 'Doe',
			email: 'jane@example.com',
			phone_number: '111222333',
		};
		const newState = RoomsReducer(RoomInitialState, {
			type: constants.OCCUPANCY_OK,
			guest,
		});
		expect(newState.guest).toEqual(guest);
	});
});
