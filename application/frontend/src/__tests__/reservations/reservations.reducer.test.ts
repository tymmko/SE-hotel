import { ReservationReducer } from '../../reducers/reservations.reducer';
import * as action from '../../types/constants';
import { ReservationInitialState, ReservationStatus } from '../../types/reservation';

describe('ReservationReducer', () => {
	it('should handle RESERVATIONS_LOADING', () => {
		const nextState = ReservationReducer(ReservationInitialState, {
			type: action.RESERVATIONS_LOADING
		});
		expect(nextState.loading).toBe(true);
		expect(nextState.error).toBeNull();
	});

	it('should handle RESERVATIONS_OK', () => {
		const mockReservations = [{ id: 1 }, { id: 2 }];
		const nextState = ReservationReducer(ReservationInitialState, {
			type: action.RESERVATIONS_OK,
			reservations: mockReservations
		});
		expect(nextState.reservations).toEqual(mockReservations);
		expect(nextState.loading).toBe(false);
	});

	it('should handle RESERVATIONS_ERROR', () => {
		const error = 'Failed to fetch';
		const nextState = ReservationReducer(ReservationInitialState, {
			type: action.RESERVATIONS_ERROR,
			error
		});
		expect(nextState.error).toBe(error);
		expect(nextState.loading).toBe(false);
	});

	it('should handle CREATE_RESERVATION_OK', () => {
		const reservation = { id: 1 };
		const prevState = { ...ReservationInitialState, reservations: [] };
		const nextState = ReservationReducer(prevState, {
			type: action.CREATE_RESERVATION_OK,
			reservation
		});
		expect(nextState.reservations).toContainEqual(reservation);
	});

	it('should handle RESERVATION_OK', () => {
		const reservation = { id: 1 };
		const nextState = ReservationReducer(ReservationInitialState, {
			type: action.RESERVATION_OK,
			reservation
		});
		expect(nextState.reservation).toEqual(reservation);
	});

	it('should handle RESERVATION_STATUS_OK and update reservations array', () => {
		const prevState = {
			...ReservationInitialState,
			reservations: [
				{
					id: 1,
					status: 'confirmed' as ReservationStatus,
					guest_id: 1,
					room_id: 1,
					check_in_date: '2025-05-20',
					check_out_date: '2025-05-23',
				},
				{
					id: 2,
					status: 'confirmed' as ReservationStatus,
					guest_id: 2,
					room_id: 2,
					check_in_date: '2025-05-24',
					check_out_date: '2025-05-28',
				}
			],
			reservation: {
				id: 1,
				status: 'confirmed' as ReservationStatus,
				guest_id: 1,
				room_id: 1,
				check_in_date: '2025-05-20',
				check_out_date: '2025-05-23',
			}
		};
	
		const updatedReservation = {
			id: 1,
			status: 'checked-in' as ReservationStatus,
			guest_id: 1,
			room_id: 1,
			check_in_date: '2025-05-20',
			check_out_date: '2025-05-23',
		};
	
		const nextState = ReservationReducer(prevState, {
			type: action.RESERVATION_STATUS_OK,
			reservation: updatedReservation
		});
	
		expect(nextState.reservation).toEqual(updatedReservation);
		expect(nextState.reservations[0].status).toBe('checked-in');
	});
});
