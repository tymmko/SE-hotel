[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/reservations.thunks](../README.md) / updateReservationStatus

# Function: updateReservationStatus()

> **updateReservationStatus**(`id`, `status`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/reservations.thunks.ts:97

Thunk to update the status of a reservation.

## Parameters

### id

The reservation ID.

`string` | `number`

### status

`ReservationStatus`

The new status to assign (e.g., `checked-in`, `cancelled`, etc.).

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `reservationStatusLoading`, then:
- `reservationStatusOk` on success
- `reservationStatusError` on failure

## Example

```ts
dispatch(updateReservationStatus(42, 'checked-in'));
```
