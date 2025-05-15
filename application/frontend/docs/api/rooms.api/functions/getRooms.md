[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/rooms.api](../README.md) / getRooms

# Function: getRooms()

> **getRooms**(): `Promise`\<`Room`[]\>

Defined in: src/api/rooms.api.ts:15

Fetches the list of all rooms from the backend.

## Returns

`Promise`\<`Room`[]\>

A promise resolving to an array of `Room` objects.

## Example

```ts
const rooms = await getRooms();
console.log(rooms[0].name);
```
