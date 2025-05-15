[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/guests.actions](../README.md) / guestsError

# Function: guestsError()

> **guestsError**(`error`): `object`

Defined in: src/actions/guests.actions.ts:34

Creates an action dispatched when guest list loading fails.

## Parameters

### error

`any`

An error object or error message.

## Returns

`object`

A `GUESTS_ERROR` action with the error payload.

### error

> **error**: `any`

### type

> **type**: `string` = `constants.GUESTS_ERROR`
