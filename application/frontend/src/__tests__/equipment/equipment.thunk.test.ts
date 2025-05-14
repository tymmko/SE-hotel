// equipment.thunks.test.ts
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api/api';
import * as thunks from '../../thunks/equipments.thunks';
import * as actions from '../../actions/equipments.actions';
import * as URL from '../../api/url';
import { Equipment } from '../../types/equipments';
import { createMockStore } from '../utils/mockStore';

describe('equipments thunks', () => {
	const mockAxios = new MockAdapter(api);

	beforeEach(() => {
		mockAxios.reset();
	});

	it('fetchEquipments dispatches EQUIPMENTS_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const equipments: Equipment[] = [
			{ id: 1, name: 'TV', price: 100, room_id: 1 }
		];
		mockAxios.onGet(URL.URL.equipments).reply(200, { equipments });

		await (thunks.fetchEquipments() as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.equipmentsLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.equipmentsOk(equipments));
	});

	it('fetchEquiment dispatches EQUIPMENT_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const roomEquipments: Equipment[] = [
			{ id: 2, name: 'Fridge', price: 150, room_id: 2 }
		];
		mockAxios.onGet(URL.URL.equipment(2)).reply(200, { equipment: roomEquipments });

		await (thunks.fetchEquiment(2) as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.equipmentLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.equipmentOk(roomEquipments));
	});

	it('createEquipment dispatches EQUIPMENT_CREATE_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const equipment: Equipment = { id: 3, name: 'Microwave', price: 80, room_id: 3 };
		mockAxios.onPost(URL.URL.equipment(3)).reply(200, equipment);

		await (thunks.createEquipment(3, equipment) as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.equipmentCreateLoading());
		expect(dispatch).toHaveBeenCalledWith(actions.equipmentCreateOk(equipment));
	});

	it('updateEquipment dispatches EQUIPMENT_UPDATE_OK on success', async () => {
		const dispatch = jest.fn();
		const store = createMockStore({}, dispatch);

		const updatedEquipment: Partial<Equipment> = { name: 'Microwave Oven', price: 90, room_id: 3 };
		mockAxios.onPatch(URL.URL.equipmentById(3)).reply(200, { updatedEquipment });

		await (thunks.updateEquipment(3, updatedEquipment) as any)(dispatch, store.getState, undefined);

		expect(dispatch).toHaveBeenCalledWith(actions.equipmentUpdateLoading());
	});
});
