[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/rooms.api](../README.md) / getRoomById

# Function: getRoomById()

> **getRoomById**(`id`): `Promise`\<`Room`\>

Defined in: src/api/rooms.api.ts:43

Fetches a specific room by its ID.

## Parameters

### id

The ID of the room to retrieve.

`string` | `number`

## Returns

`Promise`\<`Room`\>

A promise resolving to the corresponding `Room` object.

## Example

```ts
const room = await getRoomById(101);
```
