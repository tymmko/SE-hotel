[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/rooms.thunks](../README.md) / fetchRoomById

# Function: fetchRoomById()

> **fetchRoomById**(`id`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/rooms.thunks.ts:66

Thunk for fetching a room by its ID.

## Parameters

### id

The ID of the room to fetch.

`string` | `number`

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Example

```ts
dispatch(fetchRoomById(12));
```
