[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/url](../README.md) / URL

# Variable: URL

> `const` **URL**: `object`

Defined in: src/api/url.ts:19

An object that maps all logical backend endpoints used in the application.

Each entry corresponds to a resource or action provided by the backend API.
Functions are used for endpoints that require dynamic parameters (e.g., `id`).

## Type declaration

### bill()

> **bill**: (`id`) => `string`

Endpoint to retrieve a specific bill.

#### Parameters

##### id

Bill ID

`string` | `number`

#### Returns

`string`

### bills

> **bills**: `string`

Endpoint to retrieve or create bills.

### equipment()

> **equipment**: (`id`) => `string`

Endpoint to retrieve or modify a room's equipment.

#### Parameters

##### id

Room ID

`string` | `number`

#### Returns

`string`

### equipmentById()

> **equipmentById**: (`id`) => `string`

Endpoint to update or delete a specific equipment item.

#### Parameters

##### id

Equipment ID

`string` | `number`

#### Returns

`string`

### equipments

> **equipments**: `string`

Endpoint to fetch all available equipment.

### guest()

> **guest**: (`id`) => `string`

Endpoint to retrieve or update a specific guest.

#### Parameters

##### id

Guest ID

`string` | `number`

#### Returns

`string`

### guests

> **guests**: `string`

Endpoint to fetch all guests.

### login

> **login**: `string`

Endpoint for user login.

### occupancy()

> **occupancy**: (`id`) => `string`

Endpoint to fetch the current guest occupying the room.

#### Parameters

##### id

Room ID

`string` | `number`

#### Returns

`string`

### priceHistory()

> **priceHistory**: (`id`) => `string`

Endpoint to get or post a room's price history.

#### Parameters

##### id

Room ID

`string` | `number`

#### Returns

`string`

### register

> **register**: `string`

Endpoint for user registration.

### reservation()

> **reservation**: (`id`) => `string`

Endpoint to retrieve or modify a specific reservation.

#### Parameters

##### id

Reservation ID

`string` | `number`

#### Returns

`string`

### reservations

> **reservations**: `string`

Endpoint to retrieve or create reservations.

### reservationStatus()

> **reservationStatus**: (`id`) => `string`

Endpoint to update the status of a reservation.

#### Parameters

##### id

Reservation ID

`string` | `number`

#### Returns

`string`

### room()

> **room**: (`id`) => `string`

Endpoint to get or modify a specific room.

#### Parameters

##### id

Room ID

`string` | `number`

#### Returns

`string`

### rooms

> **rooms**: `string`

Endpoint to retrieve or create rooms.
