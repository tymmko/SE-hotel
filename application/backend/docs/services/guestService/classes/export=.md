[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [services/guestService](../README.md) / export=

# Class: export=

Defined in: services/guestService.js:5

Service for managing guest-related business logic
Extends BaseService to provide guest-specific operations using UserRepository

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`userRepository`): `GuestService`

Defined in: services/guestService.js:9

#### Parameters

##### userRepository

`UserRepository`

Repository for user data

#### Returns

`GuestService`

#### Overrides

`BaseService.constructor`

## Methods

### createGuest()

> **createGuest**(`guestData`): `Promise`\<`any`\>

Defined in: services/guestService.js:49

Create a new guest user

#### Parameters

##### guestData

Guest data

###### email

`string`

Email address

###### first_name

`string`

First name

###### last_name

`string`

Last name

###### phone_number?

`string`

Phone number

#### Returns

`Promise`\<`any`\>

Created guest user

#### Throws

If required fields are missing, email is invalid, or email is already in use

***

### getAllGuests()

> **getAllGuests**(): `Promise`\<`any`[]\>

Defined in: services/guestService.js:18

Retrieve all users with the 'guest' role

#### Returns

`Promise`\<`any`[]\>

List of guest users

***

### getGuestById()

> **getGuestById**(`guestId`): `Promise`\<`any`\>

Defined in: services/guestService.js:31

Retrieve a single guest user by ID

#### Parameters

##### guestId

Guest user ID

`string` | `number`

#### Returns

`Promise`\<`any`\>

Guest user

#### Throws

If guest is not found or user is not a guest

***

### updateGuest()

> **updateGuest**(`guestId`, `guestData`): `Promise`\<`any`\>

Defined in: services/guestService.js:82

Update an existing guest user

#### Parameters

##### guestId

Guest user ID

`string` | `number`

##### guestData

Data to update

###### email?

`string`

Email address

###### first_name?

`string`

First name

###### last_name?

`string`

Last name

###### phone_number?

`string`

Phone number

#### Returns

`Promise`\<`any`\>

Updated guest user

#### Throws

If guest is not found or email is invalid
