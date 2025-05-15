[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/equipments.thunks](../README.md) / updateEquipment

# Function: updateEquipment()

> **updateEquipment**(`id`, `updates`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/equipments.thunks.ts:91

Thunk for updating an existing equipment entry.

## Parameters

### id

`number`

The equipment ID.

### updates

`Partial`\<`Equipment`\>

The partial update data.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `equipmentUpdateLoading` → `equipmentUpdateOk` or `equipmentUpdateError`.

## Example

```ts
dispatch(updateEquipment(10, { price: 250 }));
```
