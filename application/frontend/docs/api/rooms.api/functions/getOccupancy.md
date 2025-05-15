[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/rooms.api](../README.md) / getOccupancy

# Function: getOccupancy()

> **getOccupancy**(`id`): `Promise`\<`Guest`\>

Defined in: src/api/rooms.api.ts:87

Retrieves the current occupancy (guest) of a room.

## Parameters

### id

The ID of the room.

`string` | `number`

## Returns

`Promise`\<`Guest`\>

A promise resolving to the `Guest` currently occupying the room.

## Example

```ts
const guest = await getOccupancy(101);
console.log(guest.fullName);
```
