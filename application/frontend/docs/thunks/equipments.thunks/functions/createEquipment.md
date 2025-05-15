[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/equipments.thunks](../README.md) / createEquipment

# Function: createEquipment()

> **createEquipment**(`id`, `equipment`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/equipments.thunks.ts:66

Thunk for creating a new equipment entry for a room.

## Parameters

### id

`number`

The ID of the room.

### equipment

`Partial`\<`Equipment`\>

The new equipment data (name, price, etc.).

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `equipmentCreateLoading` → `equipmentCreateOk` or `equipmentCreateError`.

## Example

```ts
dispatch(createEquipment(5, { name: 'TV', price: 200 }));
```
