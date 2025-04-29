import { Reservation, NewReservation } from '../types/reservation';

export const RESERVATIONS_LOADING        = 'RESERVATIONS_LOADING';
export const RESERVATIONS_OK             = 'RESERVATIONS_OK';
export const RESERVATIONS_ERROR          = 'RESERVATIONS_ERROR';
export const RESERVATION_CREATE_LOADING  = 'RESERVATION_CREATE_LOADING';
export const RESERVATION_CREATE_OK       = 'RESERVATION_CREATE_OK';
export const RESERVATION_CREATE_ERROR    = 'RESERVATION_CREATE_ERROR';

export const reservationsLoading       = () => ({ type: RESERVATIONS_LOADING } as const);
export const reservationsOk            = (payload: Reservation[]) => ({ type: RESERVATIONS_OK, payload } as const);
export const reservationsError         = (error: any) => ({ type: RESERVATIONS_ERROR, error } as const);

export const reservationCreateLoading  = () => ({ type: RESERVATION_CREATE_LOADING } as const);
export const reservationCreateOk       = (payload: Reservation) => ({ type: RESERVATION_CREATE_OK, payload } as const);
export const reservationCreateError    = (error: any) => ({ type: RESERVATION_CREATE_ERROR, error } as const);

export type ReservationsAction =
  | ReturnType<typeof reservationsLoading>
  | ReturnType<typeof reservationsOk>
  | ReturnType<typeof reservationsError>
  | ReturnType<typeof reservationCreateLoading>
  | ReturnType<typeof reservationCreateOk>
  | ReturnType<typeof reservationCreateError>;
