[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [controllers/user.controller](../README.md) / export=

# Class: export=

Defined in: controllers/user.controller.js:5

Controller for managing user-related endpoints
Handles HTTP requests for user registration and login

## Constructors

### Constructor

> **new export=**(`userService`): `UserController`

Defined in: controllers/user.controller.js:9

#### Parameters

##### userService

`UserService`

Service for user operations

#### Returns

`UserController`

## Methods

### login()

> **login**(`req`, `res`): `Promise`\<`void`\>

Defined in: controllers/user.controller.js:63

Log in a user

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the authentication token and user details

#### Example

```ts
POST /login
{
  "username": "johndoe",
  "password": "secure123"
}
```

***

### register()

> **register**(`req`, `res`): `Promise`\<`void`\>

Defined in: controllers/user.controller.js:29

Register a new user

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the created user

#### Example

```ts
POST /register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secure123",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "123-456-7890"
}
```
