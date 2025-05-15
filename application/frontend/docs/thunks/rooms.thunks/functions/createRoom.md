[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/rooms.thunks](../README.md) / createRoom

# Function: createRoom()

> **createRoom**(`room`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/rooms.thunks.ts:45

Thunk for creating a new room.

## Parameters

### room

`Omit`\<`Room`, `"id"`\>

The room details, excluding `id`.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `createRoomLoading`, then:
- `createRoomOk` with the new room
- `createRoomError` on failure

## Example

```ts
dispatch(createRoom({ number: 101, type: 'double', price: 100 }));
```
