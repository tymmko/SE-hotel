[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/bills.api](../README.md) / getBills

# Function: getBills()

> **getBills**(): `Promise`\<`Bill`[]\>

Defined in: src/api/bills.api.ts:14

Fetches the list of all bills from the backend.

## Returns

`Promise`\<`Bill`[]\>

A promise that resolves to an array of `Bill` objects.

## Example

```ts
const bills = await getBills();
console.log(bills[0].amount);
```
