[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/bills.actions](../README.md) / billsOk

# Function: billsOk()

> **billsOk**(`bills`): `object`

Defined in: src/actions/bills.actions.ts:19

Creates an action dispatched when bills are successfully loaded.

## Parameters

### bills

`Bill`[]

An array of bill objects retrieved from the backend.

## Returns

`object`

A `BILLS_OK` action containing the bills payload.

### bills

> **bills**: `Bill`[]

### type

> **type**: `string` = `constants.BILLS_OK`
