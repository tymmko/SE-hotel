[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [services/userService](../README.md) / export=

# Class: export=

Defined in: services/userService.js:5

Service for managing user-related business logic
Handles user registration and authentication

## Constructors

### Constructor

> **new export=**(`userRepository`): `UserService`

Defined in: services/userService.js:9

#### Parameters

##### userRepository

`UserRepository`

Repository for user data

#### Returns

`UserService`

## Methods

### login()

> **login**(`credentials`): `Promise`\<`any`\>

Defined in: services/userService.js:60

Log in a user and generate a JWT

#### Parameters

##### credentials

Login credentials

###### password

`string`

Password

###### username

`string`

Username

#### Returns

`Promise`\<`any`\>

Object containing JWT and user details

#### Throws

If credentials are invalid or configuration is incorrect

***

### register()

> **register**(`userData`): `Promise`\<`any`\>

Defined in: services/userService.js:25

Register a new user with 'admin' role

#### Parameters

##### userData

User data

###### email

`string`

Email address

###### first_name?

`string`

First name

###### last_name?

`string`

Last name

###### password

`string`

Password

###### phone_number?

`string`

Phone number

###### username

`string`

Username

#### Returns

`Promise`\<`any`\>

Created user

#### Throws

If required fields are missing or user already exists
