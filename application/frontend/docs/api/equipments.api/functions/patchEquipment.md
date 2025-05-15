[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/equipments.api](../README.md) / patchEquipment

# Function: patchEquipment()

> **patchEquipment**(`id`, `payload`): `Promise`\<`any`\>

Defined in: src/api/equipments.api.ts:57

Updates an existing equipment entry.

## Parameters

### id

`number`

The ID of the equipment.

### payload

`Partial`\<`Equipment`\>

Fields to update in the equipment.

## Returns

`Promise`\<`any`\>

A promise resolving to the updated `Equipment` object.

## Example

```ts
await patchEquipment(7, { condition: "needs repair" });
```
