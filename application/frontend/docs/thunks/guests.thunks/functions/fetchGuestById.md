[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/guests.thunks](../README.md) / fetchGuestById

# Function: fetchGuestById()

> **fetchGuestById**(`id`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/guests.thunks.ts:44

Thunk for fetching details of a specific guest by ID.

## Parameters

### id

The ID of the guest to fetch.

`string` | `number`

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

- Dispatches `guestLoading` before starting the request.
- On success, dispatches `guestOk` with the guest's data.
- On failure, dispatches `guestError` with the error object.

## Example

```ts
dispatch(fetchGuestById(101));
```
