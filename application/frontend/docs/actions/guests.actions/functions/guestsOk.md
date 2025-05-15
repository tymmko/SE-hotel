[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/guests.actions](../README.md) / guestsOk

# Function: guestsOk()

> **guestsOk**(`guests`): `object`

Defined in: src/actions/guests.actions.ts:23

Creates an action dispatched when guest list is successfully loaded.

## Parameters

### guests

`Guest`[]

An array of `Guest` objects.

## Returns

`object`

A `GUESTS_OK` action with the guests payload.

### guests

> **guests**: `Guest`[]

### type

> **type**: `string` = `constants.GUESTS_OK`
