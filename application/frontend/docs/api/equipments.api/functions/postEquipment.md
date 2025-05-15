[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/equipments.api](../README.md) / postEquipment

# Function: postEquipment()

> **postEquipment**(`id`, `payload`): `Promise`\<`Equipment`\>

Defined in: src/api/equipments.api.ts:42

Adds a new equipment entry to a specific room.

## Parameters

### id

The ID of the room.

`string` | `number`

### payload

`Partial`\<`Equipment`\>

Partial equipment data to be added.

## Returns

`Promise`\<`Equipment`\>

A promise resolving to the newly created `Equipment` object.

## Example

```ts
await postEquipment(101, { name: "TV", condition: "good" });
```
