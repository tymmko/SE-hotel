[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [controllers/room.controller](../README.md) / export=

# Class: export=

Defined in: controllers/room.controller.js:5

Controller for managing room-related endpoints
Handles HTTP requests and delegates business logic to the RoomService

## Constructors

### Constructor

> **new export=**(`roomService`): `RoomController`

Defined in: controllers/room.controller.js:9

#### Parameters

##### roomService

`RoomService`

Service for room operations

#### Returns

`RoomController`

## Methods

### createRoom()

> **createRoom**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:159

Create a new room

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

Sends a JSON response with the created room

#### Example

```ts
POST /rooms
{
  "number": "101",
  "type": "single",
  "price": 100.00
}
```

***

### deleteRoom()

> **deleteRoom**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:223

Delete a room

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

Sends a JSON response confirming deletion

#### Example

```ts
DELETE /rooms/123
```

***

### getAllRooms()

> **getAllRooms**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:22

Retrieve all rooms

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

Sends a JSON response with the list of rooms

#### Example

```ts
GET /rooms
```

***

### getAvailableRooms()

> **getAvailableRooms**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:256

Retrieve available rooms for a date range

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

Sends a JSON response with the list of available rooms

#### Example

```ts
GET /rooms/available?checkIn=2025-01-01&checkOut=2025-01-05
```

***

### getCurrentOccupancy()

> **getCurrentOccupancy**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:71

Retrieve the current reservation and guest for a room

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

Sends a JSON response with occupancy information

#### Example

```ts
GET /rooms/123/occupancy
```

***

### getEquipmentByRoom()

> **getEquipmentByRoom**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:126

Retrieve equipment for a room

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

Sends a JSON response with the list of equipment

#### Example

```ts
GET /rooms/123/equipment
```

***

### getPriceHistoryByRoom()

> **getPriceHistoryByRoom**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:98

Retrieve price history for a room

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

Sends a JSON response with the price history

#### Example

```ts
GET /rooms/123/price-history
```

***

### getRoom()

> **getRoom**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:44

Retrieve a single room by ID

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

Sends a JSON response with the room details

#### Example

```ts
GET /rooms/123
```

***

### updateRoom()

> **updateRoom**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:190

Update an existing room

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

Sends a JSON response with the updated room

#### Example

```ts
PUT /rooms/123
{
  "price": 120.00,
  "status": "available"
}
```

***

### updateRoomStatus()

> **updateRoomStatus**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/room.controller.js:298

Update the status of a room

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

Sends a JSON response with the updated room

#### Example

```ts
PATCH /rooms/123/status
{
  "status": "maintenance"
}
```
