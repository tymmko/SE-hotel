[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/guests.thunks](../README.md) / fetchGuests

# Function: fetchGuests()

> **fetchGuests**(): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/guests.thunks.ts:18

Thunk for fetching the full list of guests from the API.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

- Dispatches `guestsLoading` before starting the request.
- On success, dispatches `guestsOk` with the fetched data.
- On failure, dispatches `guestsError` with the error object.

## Example

```ts
dispatch(fetchGuests());
```
