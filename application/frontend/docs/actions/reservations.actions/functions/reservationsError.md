[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/reservations.actions](../README.md) / reservationsError

# Function: reservationsError()

> **reservationsError**(`error`): `object`

Defined in: src/actions/reservations.actions.ts:34

Creates an action dispatched when loading reservations fails.

## Parameters

### error

`any`

An error object or message.

## Returns

`object`

A `RESERVATIONS_ERROR` action with the error payload.

### error

> **error**: `any`

### type

> **type**: `string` = `constants.RESERVATIONS_ERROR`
