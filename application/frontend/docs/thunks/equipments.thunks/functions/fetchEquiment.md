[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/equipments.thunks](../README.md) / fetchEquiment

# Function: fetchEquiment()

> **fetchEquiment**(`id`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/equipments.thunks.ts:42

Thunk for fetching all equipment assigned to a specific room.

## Parameters

### id

The ID of the room.

`string` | `number`

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `equipmentLoading` → `equipmentOk` or `equipmentError`.

## Example

```ts
dispatch(fetchEquiment(101));
```
