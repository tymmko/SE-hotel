import { Guest } from '../types/guest';

export const GUEST_LOADING = 'GUEST_LOADING';
export const GUEST_OK      = 'GUEST_OK';
export const GUEST_ERROR   = 'GUEST_ERROR';

export const guestLoading = () => ({ type: GUEST_LOADING } as const);
export const guestOk      = (payload: Guest) => ({ type: GUEST_OK, payload } as const);
export const guestError   = (error: any) => ({ type: GUEST_ERROR, error } as const);

export type GuestAction = 
  | ReturnType<typeof guestLoading>
  | ReturnType<typeof guestOk>
  | ReturnType<typeof guestError>;
