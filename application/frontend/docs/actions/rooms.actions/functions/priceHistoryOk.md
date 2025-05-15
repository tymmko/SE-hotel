[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/rooms.actions](../README.md) / priceHistoryOk

# Function: priceHistoryOk()

> **priceHistoryOk**(`priceHistory`): `object`

Defined in: src/actions/rooms.actions.ts:133

Creates an action dispatched when price history data is loaded successfully.

## Parameters

### priceHistory

`PriceEntry`[]

An array of `Room` objects with historical price entries.

## Returns

`object`

A `PRICE_HISTORY_OK` action with the data payload.

### priceHistory

> **priceHistory**: `PriceEntry`[]

### type

> **type**: `string` = `constants.PRICE_HISTORY_OK`
