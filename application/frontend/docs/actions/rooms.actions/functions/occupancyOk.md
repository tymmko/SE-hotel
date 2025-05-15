[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/rooms.actions](../README.md) / occupancyOk

# Function: occupancyOk()

> **occupancyOk**(`guest`): `object`

Defined in: src/actions/rooms.actions.ts:205

Creates an action dispatched when a room's occupancy data is successfully retrieved.

## Parameters

### guest

`Guest`

The `Guest` currently occupying the room.

## Returns

`object`

An `OCCUPANCY_OK` action with the guest payload.

### guest

> **guest**: `Guest`

### type

> **type**: `string` = `constants.OCCUPANCY_OK`
