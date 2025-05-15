[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/reservations.thunks](../README.md) / fetchReservationById

# Function: fetchReservationById()

> **fetchReservationById**(`id`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/reservations.thunks.ts:71

Thunk to fetch a specific reservation by its ID.

## Parameters

### id

The reservation ID to retrieve.

`string` | `number`

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `reservationLoading`, then:
- `reservationOk` on success
- `reservationError` on failure

## Example

```ts
dispatch(fetchReservationById(42));
```
