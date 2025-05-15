[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/bills.actions](../README.md) / billOk

# Function: billOk()

> **billOk**(`bill`): `object`

Defined in: src/actions/bills.actions.ts:50

Creates an action dispatched when a specific bill is successfully loaded.

## Parameters

### bill

`Bill`

The bill object retrieved from the backend.

## Returns

`object`

A `BILL_OK` action containing the bill payload.

### bill

> **bill**: `Bill`

### type

> **type**: `string` = `constants.BILL_OK`
