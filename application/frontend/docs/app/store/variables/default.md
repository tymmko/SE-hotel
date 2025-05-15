[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [app/store](../README.md) / default

# Variable: default

> `const` **default**: `EnhancedStore`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `any`, `Tuple`\<\[`StoreEnhancer`\<\{ \}\>, `StoreEnhancer`\]\>\>

Defined in: src/app/store.ts:12

Configures and creates the Redux store using the application's root reducer.

## Remarks

This store combines all reducer slices into a single state tree and is
used across the entire frontend app via the Redux Provider.
