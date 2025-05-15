[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/reservations.thunks](../README.md) / fetchReservations

# Function: fetchReservations()

> **fetchReservations**(): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/reservations.thunks.ts:19

Thunk to fetch the full list of reservations.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

Dispatches `reservationsLoading`, then:
- `reservationsOk` on success
- `reservationsError` on failure

## Example

```ts
dispatch(fetchReservations());
```
