[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/rooms.thunks](../README.md) / fetchRooms

# Function: fetchRooms()

> **fetchRooms**(): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/rooms.thunks.ts:19

Thunk for fetching all rooms from the API.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `roomsLoading`, then:
- `roomsOk` with data on success
- `roomsError` on failure

## Example

```ts
dispatch(fetchRooms());
```
