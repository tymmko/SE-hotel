[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [controllers/guest.controller](../README.md) / export=

# Class: export=

Defined in: controllers/guest.controller.js:5

Controller for managing guest-related endpoints
Handles HTTP requests for guest operations, using the refactored GuestService

## Constructors

### Constructor

> **new export=**(`guestService`): `GuestController`

Defined in: controllers/guest.controller.js:9

#### Parameters

##### guestService

`GuestService`

Service for guest operations

#### Returns

`GuestController`

## Methods

### createGuest()

> **createGuest**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/guest.controller.js:78

Create a new guest

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

Sends a JSON response with the created guest

#### Example

```ts
POST /guests
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secure123",
  "first_name": "John",
  "last_name": "Doe"
}
```

***

### getAllGuests()

> **getAllGuests**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/guest.controller.js:22

Retrieve all guests

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

Sends a JSON response with the list of guests

#### Example

```ts
GET /guests
```

***

### getGuest()

> **getGuest**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/guest.controller.js:44

Retrieve a single guest by ID

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

Sends a JSON response with the guest details

#### Example

```ts
GET /guests/123
```

***

### updateGuest()

> **updateGuest**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/guest.controller.js:112

Update an existing guest

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

Sends a JSON response with the updated guest

#### Example

```ts
PUT /guests/123
{
  "first_name": "John",
  "last_name": "Smith",
  "email": "john.smith@example.com"
}
```
