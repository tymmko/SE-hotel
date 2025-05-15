[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/reservations.api](../README.md) / postReservation

# Function: postReservation()

> **postReservation**(`reservation`): `Promise`\<`Reservation`\>

Defined in: src/api/reservations.api.ts:34

Creates a new reservation.

## Parameters

### reservation

`Omit`\<`Reservation`, `"id"`\>

The reservation data, excluding the ID field.

## Returns

`Promise`\<`Reservation`\>

A promise resolving to the created `Reservation` object.

## Example

```ts
const newReservation = await postReservation({
  guestId: 1,
  roomId: 101,
  checkInDate: '2024-10-01',
  checkOutDate: '2024-10-05',
  status: 'pending'
});
```
