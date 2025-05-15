[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/rooms.actions](../README.md) / roomsError

# Function: roomsError()

> **roomsError**(`error`): `object`

Defined in: src/actions/rooms.actions.ts:35

Creates an action dispatched when loading rooms fails.

## Parameters

### error

`unknown`

Error object or message.

## Returns

`object`

A `ROOMS_ERROR` action with the error payload.

### error

> **error**: `unknown`

### type

> **type**: `string` = `constants.ROOMS_ERROR`
