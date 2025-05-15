[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/bills.thunks](../README.md) / fetchBillById

# Function: fetchBillById()

> **fetchBillById**(`id`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/bills.thunks.ts:45

Thunk for fetching a single bill by ID from the API and updating the Redux store.

## Parameters

### id

`string`

The ID of the bill to fetch.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

- Dispatches `billLoading` before the request.
- On success, dispatches `billOk` with the retrieved bill.
- On error, dispatches `billError` with a descriptive message.

## Example

```ts
dispatch(fetchBillById('abc123'));
```
