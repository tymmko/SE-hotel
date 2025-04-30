import { Amenity } from '../types/amenity';

export const AMENITIES_LOADING = 'AMENITIES_LOADING';
export const AMENITIES_OK      = 'AMENITIES_OK';
export const AMENITIES_ERROR   = 'AMENITIES_ERROR';

export const amenitiesLoading = () => ({ type: AMENITIES_LOADING } as const);
export const amenitiesOk      = (payload: Amenity[]) => ({ type: AMENITIES_OK, payload } as const);
export const amenitiesError   = (error: any) => ({ type: AMENITIES_ERROR, error } as const);

export type AmenitiesAction =
  | ReturnType<typeof amenitiesLoading>
  | ReturnType<typeof amenitiesOk>
  | ReturnType<typeof amenitiesError>;
