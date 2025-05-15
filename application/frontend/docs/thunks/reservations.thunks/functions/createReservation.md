[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/reservations.thunks](../README.md) / createReservation

# Function: createReservation()

> **createReservation**(`reservation`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/reservations.thunks.ts:45

Thunk to create a new reservation.

## Parameters

### reservation

`Omit`\<`Reservation`, `"id"`\>

Reservation data excluding the ID.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `createReservationLoading`, then:
- `createReservationOk` on success
- `createReservationError` on failure

## Example

```ts
dispatch(createReservation({ guestId: 1, roomId: 5, ... }));
```
