[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/bills.api](../README.md) / getBillById

# Function: getBillById()

> **getBillById**(`id`): `Promise`\<`Bill`\>

Defined in: src/api/bills.api.ts:29

Fetches a specific bill by its ID.

## Parameters

### id

`string`

The unique identifier of the bill.

## Returns

`Promise`\<`Bill`\>

A promise that resolves to a `Bill` object.

## Example

```ts
const bill = await getBillById("12345");
console.log(bill.status);
```
