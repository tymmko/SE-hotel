[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/equipments.actions](../README.md) / equipmentOk

# Function: equipmentOk()

> **equipmentOk**(`equipment`): `object`

Defined in: src/actions/equipments.actions.ts:51

Creates an action dispatched when a room's equipment is loaded successfully.

## Parameters

### equipment

`Equipment`[]

An array of `Equipment` objects for a specific room.

## Returns

`object`

An `EQUIPMENT_OK` action with the equipment payload.

### equipment

> **equipment**: `Equipment`[]

### type

> **type**: `string` = `constants.EQUIPMENT_OK`
