[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [reducers/reservations.reducer](../README.md) / ReservationReducer

# Function: ReservationReducer()

> **ReservationReducer**(`store`, `action`): `ReservationStoreType`

Defined in: src/reducers/reservations.reducer.ts:187

Reducer function for managing reservation-related state.

## Parameters

### store

`ReservationStoreType` = `ReservationInitialState`

Current reservation store state.

### action

`any`

Redux action with `type` and optional payload.

## Returns

`ReservationStoreType`

The updated `ReservationStoreType` state.

## Example

```ts
const updatedState = ReservationReducer(state, { type: RESERVATION_OK, reservation });
```
