[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/guests.api](../README.md) / getGuests

# Function: getGuests()

> **getGuests**(): `Promise`\<`Guest`[]\>

Defined in: src/api/guests.api.ts:14

Fetches a list of all registered guests from the backend.

## Returns

`Promise`\<`Guest`[]\>

A promise resolving to an array of `Guest` objects.

## Example

```ts
const guests = await getGuests();
console.log(guests.length);
```
