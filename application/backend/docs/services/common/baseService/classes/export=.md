[**Backend Logic Documentation v1.0.0**](../../../../README.md)

***

[Backend Logic Documentation](../../../../README.md) / [services/common/baseService](../README.md) / export=

# Class: export=

Defined in: services/common/baseService.js:5

Base Service class providing common CRUD operations
Implements the Service Layer Pattern for business logic

## Constructors

### Constructor

> **new export=**(`repository`): `BaseService`

Defined in: services/common/baseService.js:9

#### Parameters

##### repository

`any`

Data repository for the entity

#### Returns

`BaseService`

## Methods

### create()

> **create**(`data`): `Promise`\<`any`\>

Defined in: services/common/baseService.js:42

Create a new record

#### Parameters

##### data

`any`

Data to create

#### Returns

`Promise`\<`any`\>

Created record

***

### delete()

> **delete**(`id`): `Promise`\<`boolean`\>

Defined in: services/common/baseService.js:69

Delete a record

#### Parameters

##### id

Record ID

`string` | `number`

#### Returns

`Promise`\<`boolean`\>

True if deletion was successful

#### Throws

If record is not found

***

### getAll()

> **getAll**(`options?`): `Promise`\<`any`[]\>

Defined in: services/common/baseService.js:18

Retrieve all records

#### Parameters

##### options?

`any` = `{}`

Query options

#### Returns

`Promise`\<`any`[]\>

List of records

***

### getById()

> **getById**(`id`, `options?`): `Promise`\<`any`\>

Defined in: services/common/baseService.js:29

Retrieve a single record by ID

#### Parameters

##### id

Record ID

`string` | `number`

##### options?

`any` = `{}`

Query options

#### Returns

`Promise`\<`any`\>

Found record

#### Throws

If record is not found

***

### update()

> **update**(`id`, `data`): `Promise`\<`any`\>

Defined in: services/common/baseService.js:53

Update an existing record

#### Parameters

##### id

Record ID

`string` | `number`

##### data

`any`

Data to update

#### Returns

`Promise`\<`any`\>

Updated record

#### Throws

If record is not found
