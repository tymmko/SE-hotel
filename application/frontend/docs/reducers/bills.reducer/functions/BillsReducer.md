[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [reducers/bills.reducer](../README.md) / BillsReducer

# Function: BillsReducer()

> **BillsReducer**(`store`, `action`): `BillsStoreType`

Defined in: src/reducers/bills.reducer.ts:99

The reducer function for the `bills` slice of state.

## Parameters

### store

`BillsStoreType` = `BillInitialState`

The current state of the bills store.

### action

`any`

The dispatched action with a `type` and optional payload.

## Returns

`BillsStoreType`

The updated `BillsStoreType` state based on the action type.

## Example

```ts
const newState = BillsReducer(state, { type: BILLS_OK, bills: [...] });
```
