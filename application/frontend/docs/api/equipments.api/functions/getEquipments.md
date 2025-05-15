[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/equipments.api](../README.md) / getEquipments

# Function: getEquipments()

> **getEquipments**(): `Promise`\<`Equipment`[]\>

Defined in: src/api/equipments.api.ts:13

Fetches the list of all available equipment entries from the backend.

## Returns

`Promise`\<`Equipment`[]\>

A promise resolving to an array of `Equipment` objects.

## Example

```ts
const allEquipments = await getEquipments();
```
