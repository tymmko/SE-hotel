[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/rooms.api](../README.md) / getPriceHistory

# Function: getPriceHistory()

> **getPriceHistory**(`id`): `Promise`\<`PriceEntry`[]\>

Defined in: src/api/rooms.api.ts:57

Retrieves the price history entries for a specific room.

## Parameters

### id

The ID of the room.

`string` | `number`

## Returns

`Promise`\<`PriceEntry`[]\>

A promise resolving to an array of `PriceEntry` objects.

## Example

```ts
const history = await getPriceHistory(101);
```
