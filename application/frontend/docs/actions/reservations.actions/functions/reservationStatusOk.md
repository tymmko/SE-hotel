[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/reservations.actions](../README.md) / reservationStatusOk

# Function: reservationStatusOk()

> **reservationStatusOk**(`reservation`): `object`

Defined in: src/actions/reservations.actions.ts:131

Creates an action dispatched when reservation status is updated successfully.

## Parameters

### reservation

`Reservation`

The updated `Reservation` object with new status.

## Returns

`object`

A `RESERVATION_STATUS_OK` action with the payload.

### reservation

> **reservation**: `Reservation`

### type

> **type**: `string` = `constants.RESERVATION_STATUS_OK`
