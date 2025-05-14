import * as constants from '../types/constants';

export const equipmentsLoading = () => ({
	type: constants.EQUIPMENTS_LOADING,
});

export const equipmentsOk = (equipments: any[]) => ({
	type: constants.EQUIPMENTS_OK,
	equipments,
});

export const equipmentsError = (error: unknown) => ({
	type: constants.EQUIPMENTS_ERROR,
	error,
});



export const equipmentLoading = () => ({
	type: constants.EQUIPMENT_LOADING,
});

export const equipmentOk = (equipment: any[]) => ({
	type: constants.EQUIPMENT_OK,
	equipment,
});

export const equipmentError = (error: unknown) => ({
	type: constants.EQUIPMENT_ERROR,
	error,
});



export const equipmentCreateLoading = () => ({
	type: constants.EQUIPMENT_CREATE_LOADING,
});

export const equipmentCreateOk = (equipment: any) => ({
	type: constants.EQUIPMENT_CREATE_OK,
	equipment,
});

export const equipmentCreateError = (error: unknown) => ({
	type: constants.EQUIPMENT_CREATE_ERROR,
	error,
});




export const equipmentUpdateLoading = () => ({
	type: constants.EQUIPMENT_UPDATE_LOADING,
});

export const equipmentUpdateOk = (equipment: any) => ({
	type: constants.EQUIPMENT_UPDATE_OK,
	equipment,
});

export const equipmentUpdateError = (error: unknown) => ({
	type: constants.EQUIPMENT_UPDATE_ERROR,
	error,
});
