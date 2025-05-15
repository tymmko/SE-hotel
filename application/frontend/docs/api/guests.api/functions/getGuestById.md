[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/guests.api](../README.md) / getGuestById

# Function: getGuestById()

> **getGuestById**(`id`): `Promise`\<`Guest`\>

Defined in: src/api/guests.api.ts:29

Fetches details for a single guest by their ID.

## Parameters

### id

The unique identifier of the guest.

`string` | `number`

## Returns

`Promise`\<`Guest`\>

A promise resolving to a `Guest` object.

## Example

```ts
const guest = await getGuestById(42);
console.log(guest.fullName);
```
