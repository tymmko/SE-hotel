[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/rooms.thunks](../README.md) / createPriceEntry

# Function: createPriceEntry()

> **createPriceEntry**(`id`, `priceEntry`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/rooms.thunks.ts:112

Thunk for creating a new price history entry for a room.

## Parameters

### id

The room ID.

`string` | `number`

### priceEntry

`Omit`\<`PriceEntry`, `"room_id"`\>

The new price data excluding the room ID.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `createPriceEntryLoading`, then:
- `createPriceEntryOk` with the new entry
- `createPriceEntryError` on failure

## Example

```ts
dispatch(createPriceEntry(3, { price: 120, from: '2024-01-01', to: '2024-06-30' }));
```
