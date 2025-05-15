[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/equipments.api](../README.md) / getEquipment

# Function: getEquipment()

> **getEquipment**(`id`): `Promise`\<`Equipment`[]\>

Defined in: src/api/equipments.api.ts:27

Fetches all equipment associated with a specific room.

## Parameters

### id

The ID of the room.

`string` | `number`

## Returns

`Promise`\<`Equipment`[]\>

A promise resolving to an array of `Equipment` objects for that room.

## Example

```ts
const roomEquip = await getEquipment(101);
```
