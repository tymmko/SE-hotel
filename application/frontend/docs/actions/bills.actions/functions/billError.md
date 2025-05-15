[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/bills.actions](../README.md) / billError

# Function: billError()

> **billError**(`error`): `object`

Defined in: src/actions/bills.actions.ts:61

Creates an action dispatched when loading a specific bill fails.

## Parameters

### error

`unknown`

An error object or message describing the failure.

## Returns

`object`

A `BILL_ERROR` action containing the error payload.

### error

> **error**: `unknown`

### type

> **type**: `string` = `constants.BILL_ERROR`
