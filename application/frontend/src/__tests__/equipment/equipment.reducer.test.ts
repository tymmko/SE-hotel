// equipment.reducer.test.ts
import { EquipmentsReducer } from '../../reducers/equipments.reducer';
import * as action from '../../types/constants';
import { EquipmentInitialState, Equipment } from '../../types/equipments';

const sampleEquipment: Equipment = {
	id: 1,
	name: 'TV',
	price: 100,
	room_id: 1
};

describe('EquipmentsReducer', () => {
	it('should handle EQUIPMENTS_LOADING', () => {
		const newState = EquipmentsReducer(undefined, { type: action.EQUIPMENTS_LOADING });
		expect(newState.loading).toBe(true);
	});

	it('should handle EQUIPMENTS_OK', () => {
		const equipments = [sampleEquipment];
		const newState = EquipmentsReducer(undefined, { type: action.EQUIPMENTS_OK, equipments });
		expect(newState.equipments).toEqual(equipments);
	});

	it('should handle EQUIPMENTS_ERROR', () => {
		const error = 'Error loading equipments';
		const newState = EquipmentsReducer(undefined, { type: action.EQUIPMENTS_ERROR, error });
		expect(newState.error).toBe(error);
	});

	it('should handle EQUIPMENT_OK', () => {
		const equipment = [sampleEquipment];
		const newState = EquipmentsReducer(undefined, { type: action.EQUIPMENT_OK, equipment });
		expect(newState.roomEquipments).toEqual(equipment);
	});

	it('should handle EQUIPMENT_CREATE_OK', () => {
		const initialState = {
			...EquipmentInitialState,
			roomEquipments: []
		};
		const newState = EquipmentsReducer(initialState, { type: action.EQUIPMENT_CREATE_OK, equipment: sampleEquipment });
		expect(newState.roomEquipments).toContainEqual(sampleEquipment);
	});

	it('should handle EQUIPMENT_UPDATE_OK', () => {
		const updatedEquipment = { ...sampleEquipment, name: 'Smart TV' };
		const initialState = {
			...EquipmentInitialState,
			roomEquipments: [sampleEquipment]
		};
		const newState = EquipmentsReducer(initialState, { type: action.EQUIPMENT_UPDATE_OK, equipment: updatedEquipment });
		expect(newState.roomEquipments[0].name).toBe('Smart TV');
	});
});
