[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/rooms.thunks](../README.md) / fetchPriceHistory

# Function: fetchPriceHistory()

> **fetchPriceHistory**(`id`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/rooms.thunks.ts:86

Thunk for fetching a room's full price history.

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

## Example

```ts
dispatch(fetchPriceHistory(3));
```
