// reservation.thunks.test.ts
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api/api';
import * as thunks from '../../thunks/reservations.thunks';
import * as actions from '../../actions/reservations.actions';
import * as URL from '../../api/url';
import { Reservation, ReservationStatus } from '../../types/reservation';
import { createMockStore } from '../utils/mockStore';

describe('reservations thunks', () => {
	const mockAxios = new MockAdapter(api);

	beforeEach(() => {
		mockAxios.reset();
	});

	it('fetchReservations dispatches RESERVATIONS_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const reservations: Reservation[] = [
			{
			id: 1,
			room_id: 1,
			guest_id: 1,
			status: 'confirmed',
			check_in_date: '2025-05-21',
			check_out_date: '2025-05-24'
			}
		];
		mockAxios.onGet(URL.URL.reservations).reply(200, { reservations });

		await (thunks.fetchReservations() as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.reservationsLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.reservationsOk(reservations));
	});

	it('createReservation dispatches CREATE_RESERVATION_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const newReservation = {
			id: 1,
			room_id: 2,
			guest_id: 3,
			status: 'confirmed' as ReservationStatus,
			check_in_date: '2025-06-01',
			check_out_date: '2025-06-05'
		};
		mockAxios.onPost(URL.URL.reservations).reply(200, { reservation: newReservation });

		await (thunks.createReservation({ ...newReservation }) as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.createReservationLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.createReservationOk(newReservation));
	});

	it('fetchReservationById dispatches RESERVATION_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const reservation: Reservation = {
			id: 1,
			room_id: 1,
			guest_id: 1,
			status: 'confirmed',
			check_in_date: '2025-05-21',
			check_out_date: '2025-05-24'
		};
		mockAxios.onGet(URL.URL.reservation(1)).reply(200, { reservation });

		await (thunks.fetchReservationById(1) as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.reservationLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.reservationOk(reservation));
	});

	it('updateReservationStatus dispatches RESERVATION_STATUS_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const updated = {
			id: 1,
			room_id: 1,
			guest_id: 1,
			status: 'checked-in',
			check_in_date: '2025-05-21',
			check_out_date: '2025-05-24'
		};
		mockAxios.onPost(URL.URL.reservationStatus(1)).reply(200, updated);

		await (thunks.updateReservationStatus(1, 'checked-in') as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.reservationStatusLoading());
	});
});
