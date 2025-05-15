[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [reducers/guests.reducer](../README.md) / GuestReducer

# Function: GuestReducer()

> **GuestReducer**(`store`, `action`): `GuestStoreType`

Defined in: src/reducers/guests.reducer.ts:99

Reducer function for managing guest-related state.

## Parameters

### store

`GuestStoreType` = `GuestInitialState`

The current guest state store.

### action

`any`

The dispatched action with type and payload.

## Returns

`GuestStoreType`

The updated `GuestStoreType` state.

## Example

```ts
const nextState = GuestReducer(prevState, { type: GUESTS_OK, guests: [...] });
```
