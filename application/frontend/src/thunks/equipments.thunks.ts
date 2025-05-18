import { AppDispatch } from '../app/store';
import * as actions from '../actions/equipments.actions';
import * as API from '../api/equipments.api';
import { Equipment } from '../types/equipments';

/**
 * Thunk for fetching the full list of available equipment.
 *
 * @remarks
 * Dispatches `equipmentsLoading` before the API call.
 * On success, dispatches `equipmentsOk`.
 * On failure, dispatches `equipmentsError`.
 *
 * @example
 * ```ts
 * dispatch(fetchEquipments());
 * ```
 */
export const fetchEquipments = () => async (dispatch: AppDispatch) => {
	dispatch(actions.equipmentsLoading());
	try {
		const equipments = await API.getEquipments();
		dispatch(actions.equipmentsOk(equipments));
	} catch (err) {
		dispatch(actions.equipmentsError(err));
	}
};

/**
 * Thunk for fetching all equipment assigned to a specific room.
 *
 * @param id - The ID of the room.
 *
 * @remarks
 * Dispatches `equipmentLoading` → `equipmentOk` or `equipmentError`.
 *
 * @example
 * ```ts
 * dispatch(fetchEquiment(101));
 * ```
 */
export const fetchEquiment = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.equipmentLoading());
	try {
		const equipment = await API.getEquipment(id);
		dispatch(actions.equipmentOk(equipment));
	} catch (err) {
		dispatch(actions.equipmentError(err));
	}
};

/**
 * Thunk for creating a new equipment entry for a room.
 *
 * @param id - The ID of the room.
 * @param equipment - The new equipment data (name, price, etc.).
 *
 * @remarks
 * Dispatches `equipmentCreateLoading` → `equipmentCreateOk` or `equipmentCreateError`.
 *
 * @example
 * ```ts
 * dispatch(createEquipment(5, { name: 'TV', price: 200 }));
 * ```
 */
export const createEquipment = (id: number, equipment: Partial<Equipment>) => async (dispatch: AppDispatch) => {
	dispatch(actions.equipmentCreateLoading());
	try {
		const created = await API.postEquipment(id, equipment);
		dispatch(actions.equipmentCreateOk(created));
	} catch (err) {
		dispatch(actions.equipmentCreateError(err));
	}
};


/**
 * Thunk for updating an existing equipment entry.
 *
 * @param id - The equipment ID.
 * @param updates - The partial update data.
 *
 * @remarks
 * Dispatches `equipmentUpdateLoading` → `equipmentUpdateOk` or `equipmentUpdateError`.
 *
 * @example
 * ```ts
 * dispatch(updateEquipment(10, { price: 250 }));
 * ```
 */
export const updateEquipment = (id: number, updates: Partial<Equipment>) => async (dispatch: AppDispatch) => {
	dispatch(actions.equipmentUpdateLoading());
	try {
		const updated = await API.patchEquipment(id, updates);
		dispatch(actions.equipmentUpdateOk(updated));
	} catch (err) {
		dispatch(actions.equipmentUpdateError(err));
	}
};

