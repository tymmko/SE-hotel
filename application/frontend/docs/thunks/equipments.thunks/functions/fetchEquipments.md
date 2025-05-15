[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/equipments.thunks](../README.md) / fetchEquipments

# Function: fetchEquipments()

> **fetchEquipments**(): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/equipments.thunks.ts:19

Thunk for fetching the full list of available equipment.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `equipmentsLoading` before the API call.
On success, dispatches `equipmentsOk`.
On failure, dispatches `equipmentsError`.

## Example

```ts
dispatch(fetchEquipments());
```
