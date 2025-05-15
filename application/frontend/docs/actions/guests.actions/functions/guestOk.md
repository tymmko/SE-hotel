[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/guests.actions](../README.md) / guestOk

# Function: guestOk()

> **guestOk**(`guest`): `object`

Defined in: src/actions/guests.actions.ts:59

Creates an action dispatched when a guest is successfully loaded.

## Parameters

### guest

`Guest`

The `Guest` object retrieved from the backend.

## Returns

`object`

A `GUEST_OK` action with the guest payload.

### guest

> **guest**: `Guest`

### type

> **type**: `string` = `constants.GUEST_OK`
