[**Backend Logic Documentation v1.0.0**](../../../../README.md)

***

[Backend Logic Documentation](../../../../README.md) / [data/repositories/priceHistoryRepository](../README.md) / export=

# Class: export=

Defined in: data/repositories/priceHistoryRepository.js:5

Repository for managing price history-related data operations
Extends BaseRepository to provide price history-specific data access methods

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`models`): `PriceHistoryRepository`

Defined in: data/repositories/priceHistoryRepository.js:9

#### Parameters

##### models

`any`

Sequelize models

#### Returns

`PriceHistoryRepository`

#### Overrides

`BaseRepository.constructor`

## Methods

### addPriceHistory()

> **addPriceHistory**(`roomId`, `price`, `startDate`, `endDate`): `Promise`\<`any`\>

Defined in: data/repositories/priceHistoryRepository.js:23

Add a new price history entry to a room

#### Parameters

##### roomId

`number`

Room ID

##### price

`number`

Price per night

##### startDate

`Date`

Start date

##### endDate

`Date`

End date

#### Returns

`Promise`\<`any`\>

Created price history entry

#### Throws

If an error occurs during creation

***

### findPriceHistoryByRoom()

> **findPriceHistoryByRoom**(`roomId`): `Promise`\<`any`[]\>

Defined in: data/repositories/priceHistoryRepository.js:43

Find all price history entries for a given room

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`any`[]\>

List of price history entries

#### Throws

If an error occurs during the query
