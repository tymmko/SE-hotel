[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [services/priceHistoryService](../README.md) / export=

# Class: export=

Defined in: services/priceHistoryService.js:5

Service for managing price history-related business logic
Extends BaseService to provide price history-specific operations

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`priceHistoryRepository`, `roomRepository`): `PriceHistoryService`

Defined in: services/priceHistoryService.js:10

#### Parameters

##### priceHistoryRepository

`PriceHistoryRepository`

Repository for price history data

##### roomRepository

`RoomRepository`

Repository for room data

#### Returns

`PriceHistoryService`

#### Overrides

`BaseService.constructor`

## Methods

### addPriceHistory()

> **addPriceHistory**(`roomId`, `price`, `startDate?`, `endDate?`): `Promise`\<`any`\>

Defined in: services/priceHistoryService.js:24

Add a new price history entry for a room

#### Parameters

##### roomId

`number`

Room ID

##### price

`number`

Price per night

##### startDate?

`Date`

Start date (defaults to now)

##### endDate?

`Date`

End date (defaults to one year from now)

#### Returns

`Promise`\<`any`\>

Created price history entry

#### Throws

If room is not found or dates overlap
