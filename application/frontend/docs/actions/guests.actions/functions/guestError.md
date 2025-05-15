[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/guests.actions](../README.md) / guestError

# Function: guestError()

> **guestError**(`error`): `object`

Defined in: src/actions/guests.actions.ts:70

Creates an action dispatched when loading a guest fails.

## Parameters

### error

`unknown`

An error object or error message.

## Returns

`object`

A `GUEST_ERROR` action with the error payload.

### error

> **error**: `unknown`

### type

> **type**: `string` = `constants.GUEST_ERROR`
