[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [reducers/root.reducer](../README.md) / default

# Variable: default

> `const` **default**: `Reducer`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `any`, `Partial`\<\{ `authReducer`: `undefined` \| `AuthState`; `BillsReducer`: `undefined` \| `BillsStoreType`; `EquipmentsReducer`: `undefined` \| `EquipmentsStoreType`; `GuestReducer`: `undefined` \| `GuestStoreType`; `ReservationReducer`: `undefined` \| `ReservationStoreType`; `RoomsReducer`: `undefined` \| `RoomsStoreType`; \}\>\>

Defined in: src/reducers/root.reducer.ts:16

Combines all feature-specific reducers into a single root reducer.

## Remarks

This is the central reducer used to configure the Redux store.
Each key represents a slice of the global state, handled by its corresponding reducer.
