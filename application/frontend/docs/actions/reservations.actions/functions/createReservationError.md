[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/reservations.actions](../README.md) / createReservationError

# Function: createReservationError()

> **createReservationError**(`error`): `object`

Defined in: src/actions/reservations.actions.ts:70

Creates an action dispatched when creating a reservation fails.

## Parameters

### error

`any`

An error object or message.

## Returns

`object`

A `CREATE_RESERVATION_ERROR` action with the error payload.

### error

> **error**: `any`

### type

> **type**: `string` = `constants.CREATE_RESERVATION_ERROR`
