[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/rooms.api](../README.md) / postPriceEntry

# Function: postPriceEntry()

> **postPriceEntry**(`id`, `priceEntry`): `Promise`\<`PriceEntry`\>

Defined in: src/api/rooms.api.ts:72

Adds a new price entry to a room's price history.

## Parameters

### id

The ID of the room.

`string` | `number`

### priceEntry

`Omit`\<`PriceEntry`, `"room_id"`\>

The new price entry (excluding room_id).

## Returns

`Promise`\<`PriceEntry`\>

A promise resolving to the newly created `PriceEntry`.

## Example

```ts
await postPriceEntry(101, { price: 120, valid_from: "2025-01-01", valid_to: "2025-01-31" });
```
