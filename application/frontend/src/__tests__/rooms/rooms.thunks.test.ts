// rooms.thunks.test.ts
import { AnyAction } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api/api';
import * as thunks from '../../thunks/rooms.thunks';
import * as actions from '../../actions/rooms.actions';
import * as URL from '../../api/url';
import { Room, PriceEntry } from '../../types/rooms';
import { createMockStore } from '../utils/mockStore';

describe('rooms thunks', () => {
	const mockAxios = new MockAdapter(api);

	beforeEach(() => {
		mockAxios.reset();
	});

	it('fetchRooms dispatches ROOMS_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const rooms: Room[] = [{ id: 1, type: 'double', status: 'available', capacity: 2, price_per_night: 100 }];
		mockAxios.onGet(URL.URL.rooms).reply(200, { rooms });

		await (thunks.fetchRooms() as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.roomsLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.roomsOk(rooms));
	});

	it('fetchRoomById dispatches ROOM_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const room: Room = { id: 1, type: 'single', status: 'available', capacity: 1, price_per_night: 80 };
		mockAxios.onGet(URL.URL.room(1)).reply(200, { room });

		await (thunks.fetchRoomById(1) as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.roomLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.roomOk(room));
	});

	it('fetchPriceHistory dispatches PRICE_HISTORY_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const priceHistory: PriceEntry[] = [
			{ price_history_id: 1, room_id: 1, price: 100, start_date: '2025-01-01', end_date: '2025-12-31' }
		];
		mockAxios.onGet(URL.URL.priceHistory(1)).reply(200, { priceHistory });

		await (thunks.fetchPriceHistory(1) as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.priceHistoryLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.priceHistoryOk(priceHistory));
	});

	it('createRoom dispatches CREATE_ROOM_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const newRoom: Room = { id: 2, type: 'suite', status: 'available', capacity: 4, price_per_night: 300 };
		mockAxios.onPost(URL.URL.rooms).reply(200, { room: newRoom });

		await (thunks.createRoom({ type: 'suite', status: 'available', capacity: 4, price_per_night: 300 }) as any)(
			dispatch,
			store.getState,
			undefined
		);

		expect(dispatch).toHaveBeenCalledWith(actions.createRoomLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.createRoomOk(newRoom));
	});

	it('createPriceEntry dispatches CREATE_PRICE_ENTRY_OK on success', async () => {
		const priceEntry: PriceEntry = {
			price_history_id: 2,
			room_id: 1,
			price: 120,
			start_date: '2025-02-01',
			end_date: '2025-12-31',
		};
		mockAxios.onPost(URL.URL.priceHistory(1)).reply(200, priceEntry);

		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);
		await (thunks.createPriceEntry(1, {
			price: 120,
			start_date: '2025-02-01',
			end_date: '2025-12-31',
		}) as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.createPriceEntryLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.createPriceEntryOk(priceEntry));
	});

	it('fetchOccupancy dispatches OCCUPANCY_OK on success', async () => {
		const guest = {
			id: 1,
			guest_id: 1,
			first_name: 'John',
			last_name: 'Doe',
			email: 'john@example.com',
			phone_number: '123456789',
		};
		mockAxios.onGet(URL.URL.occupancy(1)).reply(200, { occupancyInfo: { guest } });

		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);
		await (thunks.fetchOccupancy(1) as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.occupancyLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.occupancyOk(guest));
	});
});
