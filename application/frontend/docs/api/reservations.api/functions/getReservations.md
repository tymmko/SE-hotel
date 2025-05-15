[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/reservations.api](../README.md) / getReservations

# Function: getReservations()

> **getReservations**(): `Promise`\<`Reservation`[]\>

Defined in: src/api/reservations.api.ts:14

Fetches all reservations from the backend.

## Returns

`Promise`\<`Reservation`[]\>

A promise resolving to an array of `Reservation` objects.

## Example

```ts
const reservations = await getReservations();
console.log(reservations.length);
```
