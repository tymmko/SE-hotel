[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/reservations.api](../README.md) / putStatus

# Function: putStatus()

> **putStatus**(`id`, `status`): `Promise`\<`Reservation`\>

Defined in: src/api/reservations.api.ts:64

Updates the status of a reservation.

## Parameters

### id

The ID of the reservation to update.

`string` | `number`

### status

`ReservationStatus`

The new status to apply (e.g., 'confirmed', 'checked-in').

## Returns

`Promise`\<`Reservation`\>

A promise resolving to the updated `Reservation` object.

## Example

```ts
const updated = await putStatus(5, 'checked-in');
```
