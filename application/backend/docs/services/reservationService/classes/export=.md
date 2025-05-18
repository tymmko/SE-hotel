[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [services/reservationService](../README.md) / export=

# Class: export=

Defined in: services/reservationService.js:5

Service for managing reservation-related business logic
Extends BaseService to provide reservation-specific operations

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`reservationRepository`, `roomRepository`, `userRepository`): `ReservationService`

Defined in: services/reservationService.js:11

#### Parameters

##### reservationRepository

`ReservationRepository`

Repository for reservation data

##### roomRepository

`RoomRepository`

Repository for room data

##### userRepository

`UserRepository`

Repository for user data

#### Returns

`ReservationService`

#### Overrides

`BaseService.constructor`

## Methods

### createReservation()

> **createReservation**(`reservationData`): `Promise`\<`any`\>

Defined in: services/reservationService.js:78

Create a new reservation

#### Parameters

##### reservationData

Reservation data

###### check_in_date

`string`

Check-in date

###### check_out_date

`string`

Check-out date

###### room_id

`number`

Room ID

###### status?

`string`

Reservation status (defaults to 'confirmed')

###### user_id

`number`

User ID

#### Returns

`Promise`\<`any`\>

Created reservation with details

#### Throws

If required fields are missing, dates are invalid, room is unavailable, or user/room is not found

***

### getAllReservationsWithDetails()

> **getAllReservationsWithDetails**(): `Promise`\<`any`[]\>

Defined in: services/reservationService.js:21

Retrieve all reservations with associated details

#### Returns

`Promise`\<`any`[]\>

List of reservations with details

***

### getReservationsByStatus()

> **getReservationsByStatus**(`status`): `Promise`\<`any`[]\>

Defined in: services/reservationService.js:45

Retrieve reservations by status

#### Parameters

##### status

`string`

Reservation status (e.g., 'confirmed', 'checked-in')

#### Returns

`Promise`\<`any`[]\>

List of reservations with the specified status

#### Throws

If status is invalid

***

### getReservationsByUser()

> **getReservationsByUser**(`userId`): `Promise`\<`any`[]\>

Defined in: services/reservationService.js:59

Retrieve reservations associated with a user

#### Parameters

##### userId

User ID

`string` | `number`

#### Returns

`Promise`\<`any`[]\>

List of reservations for the user

#### Throws

If user is not found

***

### getReservationWithDetails()

> **getReservationWithDetails**(`reservationId`): `Promise`\<`any`\>

Defined in: services/reservationService.js:31

Retrieve a single reservation by ID with associated details

#### Parameters

##### reservationId

Reservation ID

`string` | `number`

#### Returns

`Promise`\<`any`\>

Reservation with details

#### Throws

If reservation is not found

***

### updateReservation()

> **updateReservation**(`reservationId`, `reservationData`): `Promise`\<`any`\>

Defined in: services/reservationService.js:148

Update an existing reservation

#### Parameters

##### reservationId

Reservation ID

`string` | `number`

##### reservationData

Data to update

###### check_in_date?

`string`

Check-in date

###### check_out_date?

`string`

Check-out date

###### room_id?

`number`

Room ID

###### status?

`string`

Reservation status

###### user_id?

`number`

User ID

#### Returns

`Promise`\<`any`\>

Updated reservation with details

#### Throws

If reservation is not found, dates are invalid, room is unavailable, or user/room is not found

***

### updateReservationStatus()

> **updateReservationStatus**(`reservationId`, `status`): `Promise`\<`any`\>

Defined in: services/reservationService.js:214

Update the status of a reservation

#### Parameters

##### reservationId

Reservation ID

`string` | `number`

##### status

`string`

New status

#### Returns

`Promise`\<`any`\>

Updated reservation with details

#### Throws

If reservation is not found, status is invalid, or room is already checked-in
