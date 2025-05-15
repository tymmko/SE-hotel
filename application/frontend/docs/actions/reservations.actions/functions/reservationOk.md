[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/reservations.actions](../README.md) / reservationOk

# Function: reservationOk()

> **reservationOk**(`reservation`): `object`

Defined in: src/actions/reservations.actions.ts:95

Creates an action dispatched when a single reservation is successfully loaded.

## Parameters

### reservation

`Reservation`

The loaded `Reservation` object.

## Returns

`object`

A `RESERVATION_OK` action with the payload.

### reservation

> **reservation**: `Reservation`

### type

> **type**: `string` = `constants.RESERVATION_OK`
