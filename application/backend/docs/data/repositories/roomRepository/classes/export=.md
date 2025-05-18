[**Backend Logic Documentation v1.0.0**](../../../../README.md)

***

[Backend Logic Documentation](../../../../README.md) / [data/repositories/roomRepository](../README.md) / export=

# Class: export=

Defined in: data/repositories/roomRepository.js:5

Repository for managing room-related data operations
Extends BaseRepository to provide room-specific data access methods

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`models`): `RoomRepository`

Defined in: data/repositories/roomRepository.js:9

#### Parameters

##### models

`any`

Sequelize models

#### Returns

`RoomRepository`

#### Overrides

`BaseRepository.constructor`

## Methods

### createPriceHistory()

> **createPriceHistory**(`roomId`, `price`, `startDate?`, `endDate?`, `options?`): `Promise`\<`any`\>

Defined in: data/repositories/roomRepository.js:151

Create a new price history record for a room

#### Parameters

##### roomId

`number`

Room ID

##### price

`number`

Price per night

##### startDate?

`Date` = `...`

Start date (defaults to now)

##### endDate?

`Date` = `null`

End date (defaults to one year from now)

##### options?

`any` = `{}`

Additional query options

#### Returns

`Promise`\<`any`\>

Created price history record

#### Throws

If an error occurs during creation

***

### endCurrentPriceHistory()

> **endCurrentPriceHistory**(`roomId`): `Promise`\<`any`[]\>

Defined in: data/repositories/roomRepository.js:176

End the current price history for a room

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`any`[]\>

[affectedCount, affectedRows]

#### Throws

If an error occurs during the update

***

### findAvailableRooms()

> **findAvailableRooms**(`checkIn`, `checkOut`): `Promise`\<`any`[]\>

Defined in: data/repositories/roomRepository.js:244

Find available rooms for a date range

#### Parameters

##### checkIn

`Date`

Check-in date

##### checkOut

`Date`

Check-out date

#### Returns

`Promise`\<`any`[]\>

List of available rooms

#### Throws

If an error occurs during the query

***

### findBookedRoomIds()

> **findBookedRoomIds**(`checkIn`, `checkOut`): `Promise`\<`any`[]\>

Defined in: data/repositories/roomRepository.js:200

Find room IDs with active reservations for a date range

#### Parameters

##### checkIn

`Date`

Check-in date

##### checkOut

`Date`

Check-out date

#### Returns

`Promise`\<`any`[]\>

List of booked room IDs

#### Throws

If an error occurs during the query

***

### findCurrentPrice()

> **findCurrentPrice**(`roomId`, `date?`): `Promise`\<`any`\>

Defined in: data/repositories/roomRepository.js:294

Find the current price for a room

#### Parameters

##### roomId

Room ID

`string` | `number`

##### date?

`Date` = `...`

Date to check price for (defaults to now)

#### Returns

`Promise`\<`any`\>

Current or most recent price entry

#### Throws

If an error occurs during the query

***

### findCurrentReservationAndGuest()

> **findCurrentReservationAndGuest**(`roomId`): `Promise`\<`any`\>

Defined in: data/repositories/roomRepository.js:55

Find the current reservation and guest for a room

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`any`\>

Current reservation and guest info, or null

#### Throws

If an error occurs during the query

***

### findEquipmentByRoom()

> **findEquipmentByRoom**(`roomId`): `Promise`\<`any`[]\>

Defined in: data/repositories/roomRepository.js:128

Find equipment for a specific room

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`any`[]\>

List of equipment items

#### Throws

If an error occurs during the query

***

### findPriceHistoryByRoom()

> **findPriceHistoryByRoom**(`roomId`, `options?`): `Promise`\<`any`[]\>

Defined in: data/repositories/roomRepository.js:108

Find price history for a specific room

#### Parameters

##### roomId

`number`

Room ID

##### options?

`any` = `{}`

Additional query options

#### Returns

`Promise`\<`any`[]\>

List of price history entries

#### Throws

If an error occurs during the query

***

### findRoomsWithDetails()

> **findRoomsWithDetails**(`options?`): `Promise`\<`any`[]\>

Defined in: data/repositories/roomRepository.js:20

Find all rooms with basic details

#### Parameters

##### options?

`any` = `{}`

Additional query options

#### Returns

`Promise`\<`any`[]\>

List of rooms

#### Throws

If an error occurs during the query

***

### findRoomWithDetails()

> **findRoomWithDetails**(`roomId`): `Promise`\<`any`\>

Defined in: data/repositories/roomRepository.js:38

Find a single room by ID with basic details

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`any`\>

Room data

#### Throws

If an error occurs during the query

***

### hasActiveReservations()

> **hasActiveReservations**(`roomId`): `Promise`\<`boolean`\>

Defined in: data/repositories/roomRepository.js:269

Check if a room has active reservations

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`boolean`\>

True if the room has active reservations

#### Throws

If an error occurs during the query
