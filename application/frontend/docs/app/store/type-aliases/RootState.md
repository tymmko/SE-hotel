[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [app/store](../README.md) / RootState

# Type Alias: RootState

> **RootState** = `ReturnType`\<*typeof* `store.getState`\>

Defined in: src/app/store.ts:22

The root state type inferred from the store's current state shape.

## Example

```ts
const rooms = useSelector((state: RootState) => state.rooms.list);
```
