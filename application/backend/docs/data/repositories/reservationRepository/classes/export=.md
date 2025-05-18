[**Backend Logic Documentation v1.0.0**](../../../../README.md)

***

[Backend Logic Documentation](../../../../README.md) / [data/repositories/reservationRepository](../README.md) / export=

# Class: export=

Defined in: data/repositories/reservationRepository.js:5

Repository for managing reservation-related data operations
Extends BaseRepository to provide reservation-specific data access methods

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`models`): `ReservationRepository`

Defined in: data/repositories/reservationRepository.js:9

#### Parameters

##### models

`any`

Sequelize models

#### Returns

`ReservationRepository`

#### Overrides

`BaseRepository.constructor`

## Methods

### createStay()

> **createStay**(`reservationId`, `actualCheckIn`): `Promise`\<`any`\>

Defined in: data/repositories/reservationRepository.js:189

Create a stay record for a reservation

#### Parameters

##### reservationId

`number`

Reservation ID

##### actualCheckIn

`Date`

Actual check-in date

#### Returns

`Promise`\<`any`\>

Created stay record

#### Throws

If an error occurs during creation

***

### findReservationsByGuest()

> **findReservationsByGuest**(`userId`): `Promise`\<`any`[]\>

Defined in: data/repositories/reservationRepository.js:82

Find reservations for a specific user

#### Parameters

##### userId

`number`

User ID

#### Returns

`Promise`\<`any`[]\>

List of reservations for the user

#### Throws

If an error occurs during the query

***

### findReservationsByRoom()

> **findReservationsByRoom**(`roomId`): `Promise`\<`any`[]\>

Defined in: data/repositories/reservationRepository.js:99

Find reservations for a specific room

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`any`[]\>

List of reservations for the room

#### Throws

If an error occurs during the query

***

### findReservationsByStatus()

> **findReservationsByStatus**(`status`): `Promise`\<`any`[]\>

Defined in: data/repositories/reservationRepository.js:65

Find reservations by status

#### Parameters

##### status

`string`

Reservation status

#### Returns

`Promise`\<`any`[]\>

List of reservations with the specified status

#### Throws

If an error occurs during the query

***

### findReservationsWithDetails()

> **findReservationsWithDetails**(`options?`): `Promise`\<`any`[]\>

Defined in: data/repositories/reservationRepository.js:20

Find all reservations with associated details

#### Parameters

##### options?

`any` = `{}`

Additional query options

#### Returns

`Promise`\<`any`[]\>

List of reservations with related data

#### Throws

If an error occurs during the query

***

### findReservationWithDetails()

> **findReservationWithDetails**(`reservationId`): `Promise`\<`any`\>

Defined in: data/repositories/reservationRepository.js:48

Find a single reservation by ID with associated details

#### Parameters

##### reservationId

`number`

Reservation ID

#### Returns

`Promise`\<`any`\>

Reservation with related data

#### Throws

If an error occurs during the query

***

### isRoomAvailable()

> **isRoomAvailable**(`roomId`, `checkIn`, `checkOut`, `excludeReservationId?`): `Promise`\<`boolean`\>

Defined in: data/repositories/reservationRepository.js:140

Check if a room is available for a date range

#### Parameters

##### roomId

`number`

Room ID

##### checkIn

`Date`

Check-in date

##### checkOut

`Date`

Check-out date

##### excludeReservationId?

`number` = `null`

Reservation ID to exclude (for updates)

#### Returns

`Promise`\<`boolean`\>

True if the room is available

#### Throws

If an error occurs during the query

***

### updateReservationStatus()

> **updateReservationStatus**(`reservationId`, `status`): `Promise`\<`any`[]\>

Defined in: data/repositories/reservationRepository.js:117

Update the status of a reservation

#### Parameters

##### reservationId

`number`

Reservation ID

##### status

`string`

New status

#### Returns

`Promise`\<`any`[]\>

[affectedCount, affectedRows]

#### Throws

If an error occurs during the update

***

### updateStay()

> **updateStay**(`stayId`, `actualCheckOut`): `Promise`\<`any`[]\>

Defined in: data/repositories/reservationRepository.js:209

Update a stay with check-out information

#### Parameters

##### stayId

`number`

Stay ID

##### actualCheckOut

`Date`

Actual check-out date

#### Returns

`Promise`\<`any`[]\>

[affectedCount, affectedRows]

#### Throws

If an error occurs during the update
