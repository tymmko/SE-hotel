[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [thunks/bills.thunks](../README.md) / fetchBills

# Function: fetchBills()

> **fetchBills**(): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/thunks/bills.thunks.ts:18

Thunk for fetching all bills from the API and updating the Redux store.

## Returns

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Remarks

- Dispatches `billsLoading` before the request.
- On success, dispatches `billsOk` with the retrieved bills.
- On error, dispatches `billsError` with a descriptive message.

## Example

```ts
dispatch(fetchBills());
```
