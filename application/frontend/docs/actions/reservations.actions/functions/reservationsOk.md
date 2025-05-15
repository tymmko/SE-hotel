[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/reservations.actions](../README.md) / reservationsOk

# Function: reservationsOk()

> **reservationsOk**(`reservations`): `object`

Defined in: src/actions/reservations.actions.ts:23

Creates an action dispatched when the reservations list loads successfully.

## Parameters

### reservations

`Reservation`[]

An array of `Reservation` objects.

## Returns

`object`

A `RESERVATIONS_OK` action with the payload.

### reservations

> **reservations**: `Reservation`[]

### type

> **type**: `string` = `constants.RESERVATIONS_OK`
