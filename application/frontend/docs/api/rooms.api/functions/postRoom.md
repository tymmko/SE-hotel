[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/rooms.api](../README.md) / postRoom

# Function: postRoom()

> **postRoom**(`room`): `Promise`\<`Room`\>

Defined in: src/api/rooms.api.ts:29

Creates a new room.

## Parameters

### room

`Omit`\<`Room`, `"id"`\>

The room data, excluding the `id` field.

## Returns

`Promise`\<`Room`\>

A promise resolving to the newly created `Room` object.

## Example

```ts
const newRoom = await postRoom({ name: "Suite 1", type: "suite", capacity: 2 });
```
