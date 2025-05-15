[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/reservations.api](../README.md) / getReservationById

# Function: getReservationById()

> **getReservationById**(`id`): `Promise`\<`Reservation`\>

Defined in: src/api/reservations.api.ts:49

Fetches a reservation by its unique ID.

## Parameters

### id

The ID of the reservation.

`string` | `number`

## Returns

`Promise`\<`Reservation`\>

A promise resolving to the corresponding `Reservation` object.

## Example

```ts
const reservation = await getReservationById(10);
console.log(reservation.status);
```
