[**Backend Logic Documentation v1.0.0**](../../../../../README.md)

***

[Backend Logic Documentation](../../../../../README.md) / [data/repositories/common/baseRepository](../README.md) / export=

# Class: export=

Defined in: data/repositories/common/baseRepository.js:5

Base Repository class providing common CRUD operations
Follows the Repository Pattern to abstract data access

## Constructors

### Constructor

> **new export=**(`model`): `BaseRepository`

Defined in: data/repositories/common/baseRepository.js:9

#### Parameters

##### model

`any`

Sequelize model

#### Returns

`BaseRepository`

## Methods

### count()

> **count**(`criteria?`, `options?`): `Promise`\<`number`\>

Defined in: data/repositories/common/baseRepository.js:95

Count records by criteria

#### Parameters

##### criteria?

`any` = `{}`

Where conditions

##### options?

`any` = `{}`

Count options

#### Returns

`Promise`\<`number`\>

Number of records

#### Throws

If an error occurs during the count

***

### create()

> **create**(`data`, `options?`): `Promise`\<`any`\>

Defined in: data/repositories/common/baseRepository.js:55

Create a new record

#### Parameters

##### data

`any`

Data to create

##### options?

`any` = `{}`

Create options

#### Returns

`Promise`\<`any`\>

Created record

#### Throws

If an error occurs during creation

***

### delete()

> **delete**(`criteria`, `options?`): `Promise`\<`number`\>

Defined in: data/repositories/common/baseRepository.js:81

Delete records by criteria

#### Parameters

##### criteria

`any`

Where conditions

##### options?

`any` = `{}`

Delete options

#### Returns

`Promise`\<`number`\>

Number of deleted rows

#### Throws

If an error occurs during deletion

***

### findAll()

> **findAll**(`options?`): `Promise`\<`any`[]\>

Defined in: data/repositories/common/baseRepository.js:19

Find all records with optional filtering

#### Parameters

##### options?

`any` = `{}`

Query options (where, include, order, etc.)

#### Returns

`Promise`\<`any`[]\>

List of records

#### Throws

If an error occurs during the query

***

### findById()

> **findById**(`id`, `options?`): `Promise`\<`any`\>

Defined in: data/repositories/common/baseRepository.js:30

Find one record by primary key

#### Parameters

##### id

Primary key value

`string` | `number`

##### options?

`any` = `{}`

Query options (include, attributes, etc.)

#### Returns

`Promise`\<`any`\>

Found record or null

#### Throws

If an error occurs during the query

***

### findOne()

> **findOne**(`criteria`, `options?`): `Promise`\<`any`\>

Defined in: data/repositories/common/baseRepository.js:41

Find one record by specific criteria

#### Parameters

##### criteria

`any`

Where conditions

##### options?

`any` = `{}`

Additional query options

#### Returns

`Promise`\<`any`\>

Found record or null

#### Throws

If an error occurs during the query

***

### transaction()

> **transaction**(`callback`): `Promise`\<`any`\>

Defined in: data/repositories/common/baseRepository.js:108

Execute a transaction

#### Parameters

##### callback

`Function`

Function to execute within the transaction

#### Returns

`Promise`\<`any`\>

Transaction result

#### Throws

If an error occurs during the transaction

***

### update()

> **update**(`data`, `criteria`, `options?`): `Promise`\<`any`[]\>

Defined in: data/repositories/common/baseRepository.js:67

Update existing records

#### Parameters

##### data

`any`

Data to update

##### criteria

`any`

Where conditions

##### options?

`any` = `{}`

Update options

#### Returns

`Promise`\<`any`[]\>

[affectedCount, affectedRows]

#### Throws

If an error occurs during the update
