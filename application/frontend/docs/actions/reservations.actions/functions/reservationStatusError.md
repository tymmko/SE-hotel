[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/reservations.actions](../README.md) / reservationStatusError

# Function: reservationStatusError()

> **reservationStatusError**(`error`): `object`

Defined in: src/actions/reservations.actions.ts:142

Creates an action dispatched when updating reservation status fails.

## Parameters

### error

`unknown`

An error object or message.

## Returns

`object`

A `RESERVATION_STATUS_ERROR` action with the error payload.

### error

> **error**: `unknown`

### type

> **type**: `string` = `constants.RESERVATION_STATUS_ERROR`
