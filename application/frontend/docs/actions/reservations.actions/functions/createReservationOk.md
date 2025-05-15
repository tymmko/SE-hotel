[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/reservations.actions](../README.md) / createReservationOk

# Function: createReservationOk()

> **createReservationOk**(`reservation`): `object`

Defined in: src/actions/reservations.actions.ts:59

Creates an action dispatched when a reservation is created successfully.

## Parameters

### reservation

`Reservation`

The newly created `Reservation` object.

## Returns

`object`

A `CREATE_RESERVATION_OK` action with the payload.

### reservation

> **reservation**: `Reservation`

### type

> **type**: `string` = `constants.CREATE_RESERVATION_OK`
