[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/bills.actions](../README.md) / billsError

# Function: billsError()

> **billsError**(`error`): `object`

Defined in: src/actions/bills.actions.ts:30

Creates an action dispatched when loading bills fails.

## Parameters

### error

`unknown`

An error object or message describing the failure.

## Returns

`object`

A `BILLS_ERROR` action containing the error payload.

### error

> **error**: `unknown`

### type

> **type**: `string` = `constants.BILLS_ERROR`
