[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [controllers/reservation.controller](../README.md) / export=

# Class: export=

Defined in: controllers/reservation.controller.js:5

Controller for managing reservation-related endpoints
Handles HTTP requests and delegates business logic to the ReservationService

## Constructors

### Constructor

> **new export=**(`reservationService`): `ReservationController`

Defined in: controllers/reservation.controller.js:9

#### Parameters

##### reservationService

`ReservationService`

Service for reservation operations

#### Returns

`ReservationController`

## Methods

### createReservation()

> **createReservation**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/reservation.controller.js:97

Create a new reservation

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the created reservation

#### Example

```ts
POST /reservations
{
  "room_id": 123,
  "user_id": 456,
  "check_in_date": "2025-01-01",
  "check_out_date": "2025-01-05",
  "status": "confirmed"
}
```

***

### getAllReservations()

> **getAllReservations**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/reservation.controller.js:27

Retrieve all reservations with optional filters

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the list of reservations

#### Example

```ts
// Get all reservations
GET /reservations
// Get reservations by status
GET /reservations?status=confirmed
// Get reservations by user
GET /reservations?user_id=123
```

***

### getReservation()

> **getReservation**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/reservation.controller.js:63

Retrieve a single reservation by ID

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the reservation details

#### Example

```ts
GET /reservations/123
```

***

### updateReservation()

> **updateReservation**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/reservation.controller.js:138

Update an existing reservation

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the updated reservation

#### Example

```ts
PUT /reservations/123
{
  "check_in_date": "2025-01-02",
  "check_out_date": "2025-01-06"
}
```

***

### updateReservationStatus()

> **updateReservationStatus**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/reservation.controller.js:180

Update the status of a reservation

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the updated reservation

#### Example

```ts
PATCH /reservations/123/status
{
  "status": "checked-in"
}
```
