[**Backend Logic Documentation v1.0.0**](../../../../README.md)

***

[Backend Logic Documentation](../../../../README.md) / [data/repositories/userRepository](../README.md) / export=

# Class: export=

Defined in: data/repositories/userRepository.js:5

Repository for managing user-related data operations
Extends BaseRepository to provide user-specific data access methods

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`models`): `UserRepository`

Defined in: data/repositories/userRepository.js:10

#### Parameters

##### models

`any`

Sequelize models

#### Returns

`UserRepository`

#### Throws

If User model is not defined or missing required methods

#### Overrides

`BaseRepository.constructor`

## Methods

### createUser()

> **createUser**(`userData`): `Promise`\<`any`\>

Defined in: data/repositories/userRepository.js:34

Create a new user

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

###### password?

`string`

Password (hashed by model hook)

###### phone_number?

`string`

Phone number

###### role?

`string`

Role (defaults to 'guest')

###### username

`string`

Username

#### Returns

`Promise`\<`any`\>

Created user (without password)

#### Throws

If creation fails or constraints are violated

***

### findAllUsers()

> **findAllUsers**(`options?`): `Promise`\<`any`[]\>

Defined in: data/repositories/userRepository.js:117

Find all users with optional filtering

#### Parameters

##### options?

`any` = `{}`

Query options

#### Returns

`Promise`\<`any`[]\>

List of users (without passwords)

#### Throws

If an error occurs during the query

***

### findUserByEmail()

> **findUserByEmail**(`email`): `Promise`\<`any`\>

Defined in: data/repositories/userRepository.js:69

Find a user by email

#### Parameters

##### email

`string`

Email address

#### Returns

`Promise`\<`any`\>

User data (without password) or null

#### Throws

If an error occurs during the query

***

### findUserById()

> **findUserById**(`userId`): `Promise`\<`any`\>

Defined in: data/repositories/userRepository.js:100

Find a user by ID

#### Parameters

##### userId

User ID

`string` | `number`

#### Returns

`Promise`\<`any`\>

User data (without password) or null

#### Throws

If an error occurs during the query

***

### findUserByUsername()

> **findUserByUsername**(`username`): `Promise`\<`any`\>

Defined in: data/repositories/userRepository.js:85

Find a user by username

#### Parameters

##### username

`string`

Username

#### Returns

`Promise`\<`any`\>

User data or null

#### Throws

If an error occurs during the query

***

### hasActiveReservations()

> **hasActiveReservations**(`userId`): `Promise`\<`boolean`\>

Defined in: data/repositories/userRepository.js:151

Check if a user has active reservations

#### Parameters

##### userId

User ID

`string` | `number`

#### Returns

`Promise`\<`boolean`\>

True if the user has active reservations

#### Throws

If an error occurs during the query

***

### updateUser()

> **updateUser**(`userId`, `userData`): `Promise`\<`number`\>

Defined in: data/repositories/userRepository.js:133

Update a user

#### Parameters

##### userId

User ID

`string` | `number`

##### userData

`any`

Data to update

#### Returns

`Promise`\<`number`\>

Number of updated rows

#### Throws

If an error occurs during the update
