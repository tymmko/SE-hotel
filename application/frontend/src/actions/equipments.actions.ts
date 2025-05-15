import * as constants from '../types/constants';
import { Equipment } from '../types/equipments';

/**
 * Creates an action indicating that equipment list loading has started.
 *
 * @returns An `EQUIPMENTS_LOADING` action.
 */
export const equipmentsLoading = () => ({
	type: constants.EQUIPMENTS_LOADING,
});

/**
 * Creates an action dispatched when equipment list has loaded successfully.
 *
 * @param equipments - An array of `Equipment` objects.
 * @returns An `EQUIPMENTS_OK` action with the list payload.
 */
export const equipmentsOk = (equipments: Equipment[]) => ({
	type: constants.EQUIPMENTS_OK,
	equipments,
});

/**
 * Creates an action dispatched when equipment list loading fails.
 *
 * @param error - Error object or message.
 * @returns An `EQUIPMENTS_ERROR` action with the error payload.
 */
export const equipmentsError = (error: unknown) => ({
	type: constants.EQUIPMENTS_ERROR,
	error,
});


/**
 * Creates an action indicating that a room's equipment is being loaded.
 *
 * @returns An `EQUIPMENT_LOADING` action.
 */
export const equipmentLoading = () => ({
	type: constants.EQUIPMENT_LOADING,
});

/**
 * Creates an action dispatched when a room's equipment is loaded successfully.
 *
 * @param equipment - An array of `Equipment` objects for a specific room.
 * @returns An `EQUIPMENT_OK` action with the equipment payload.
 */
export const equipmentOk = (equipment: Equipment[]) => ({
	type: constants.EQUIPMENT_OK,
	equipment,
});

/**
 * Creates an action dispatched when loading room equipment fails.
 *
 * @param error - Error object or message.
 * @returns An `EQUIPMENT_ERROR` action with the error payload.
 */
export const equipmentError = (error: unknown) => ({
	type: constants.EQUIPMENT_ERROR,
	error,
});

//
// Create equipment actions
//

/**
 * Creates an action indicating that equipment creation has started.
 *
 * @returns An `EQUIPMENT_CREATE_LOADING` action.
 */
export const equipmentCreateLoading = () => ({
	type: constants.EQUIPMENT_CREATE_LOADING,
});

/**
 * Creates an action dispatched when new equipment is created successfully.
 *
 * @param equipment - The created `Equipment` object.
 * @returns An `EQUIPMENT_CREATE_OK` action with the new equipment.
 */
export const equipmentCreateOk = (equipment: Equipment) => ({
	type: constants.EQUIPMENT_CREATE_OK,
	equipment,
});


/**
 * Creates an action dispatched when equipment creation fails.
 *
 * @param error - Error object or message.
 * @returns An `EQUIPMENT_CREATE_ERROR` action with the error payload.
 */
export const equipmentCreateError = (error: unknown) => ({
	type: constants.EQUIPMENT_CREATE_ERROR,
	error,
});



/**
 * Creates an action indicating that equipment update has started.
 *
 * @returns An `EQUIPMENT_UPDATE_LOADING` action.
 */
export const equipmentUpdateLoading = () => ({
	type: constants.EQUIPMENT_UPDATE_LOADING,
});

/**
 * Creates an action dispatched when equipment is successfully updated.
 *
 * @param equipment - The updated equipment object.
 * @returns An `EQUIPMENT_UPDATE_OK` action.
 */
export const equipmentUpdateOk = (equipment: Equipment) => ({
	type: constants.EQUIPMENT_UPDATE_OK,
	equipment,
});

/**
 * Creates an action dispatched when equipment update fails.
 *
 * @param error - Error object or message.
 * @returns An `EQUIPMENT_UPDATE_ERROR` action with the error payload.
 */
export const equipmentUpdateError = (error: unknown) => ({
	type: constants.EQUIPMENT_UPDATE_ERROR,
	error,
});
