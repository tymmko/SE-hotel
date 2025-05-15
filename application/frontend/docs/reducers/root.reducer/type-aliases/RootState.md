[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [reducers/root.reducer](../README.md) / RootState

# Type Alias: RootState

> **RootState** = `ReturnType`\<*typeof* [`default`](../variables/default.md)\>

Defined in: src/reducers/root.reducer.ts:31

The global state type for the Redux store, inferred from the root reducer.

## Example

```ts
const rooms = useSelector((state: RootState) => state.RoomsReducer.rooms);
```
