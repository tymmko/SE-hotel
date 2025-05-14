import { AppDispatch } from '../app/store';
import * as actions from '../actions/equipments.actions';
import * as API from '../api/equipments.api';
import { Equipment } from '../types/equipments';

export const fetchEquipments = () => async (dispatch: AppDispatch) => {
	dispatch(actions.equipmentsLoading());
	try {
		const equipments = await API.getEquipments();
		dispatch(actions.equipmentsOk(equipments));
	} catch (err) {
		dispatch(actions.equipmentsError(err));
	}
};

export const fetchEquiment = (id: string | number) => async (dispatch: AppDispatch) => {
	dispatch(actions.equipmentLoading());
	try {
		const equipment = await API.getEquipment(id);
		dispatch(actions.equipmentOk(equipment));
	} catch (err) {
		dispatch(actions.equipmentError(err));
	}
};

export const createEquipment = (id: number, equipment: Partial<Equipment>) => async (dispatch: AppDispatch) => {
	dispatch(actions.equipmentCreateLoading());
	try {
		const created = await API.postEquipment(id, equipment);
		dispatch(actions.equipmentCreateOk(created));
	} catch (err) {
		dispatch(actions.equipmentCreateError(err));
	}
};

export const updateEquipment = (id: number, updates: Partial<Equipment>) => async (dispatch: AppDispatch) => {
	dispatch(actions.equipmentUpdateLoading());
	try {
		const updated = await API.patchEquipment(id, updates);
		dispatch(actions.equipmentUpdateOk(updated));
	} catch (err) {
		dispatch(actions.equipmentUpdateError(err));
	}
};
export function updateCreate(id: number, arg1: { name: string; price: number; room_id: number; }): any {
	throw new Error('Function not implemented.');
}

