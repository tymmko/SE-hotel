[**Backend Logic Documentation v1.0.0**](../../../../README.md)

***

[Backend Logic Documentation](../../../../README.md) / [data/repositories/equipmentRepository](../README.md) / export=

# Class: export=

Defined in: data/repositories/equipmentRepository.js:5

Repository for managing equipment-related data operations
Extends BaseRepository to provide equipment-specific data access methods

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`models`): `EquipmentRepository`

Defined in: data/repositories/equipmentRepository.js:9

#### Parameters

##### models

`any`

Sequelize models

#### Returns

`EquipmentRepository`

#### Overrides

`BaseRepository.constructor`

## Methods

### addEquipment()

> **addEquipment**(`roomId`, `name`, `price`): `Promise`\<`any`\>

Defined in: data/repositories/equipmentRepository.js:61

Add a new equipment item to a room

#### Parameters

##### roomId

`number`

Room ID

##### name

`string`

Equipment name

##### price

`number`

Equipment price

#### Returns

`Promise`\<`any`\>

Created equipment item

#### Throws

If an error occurs during creation

***

### deleteAllByRoom()

> **deleteAllByRoom**(`roomId`): `Promise`\<`number`\>

Defined in: data/repositories/equipmentRepository.js:136

Delete all equipment items for a room

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`number`\>

Number of deleted rows

#### Throws

If an error occurs during deletion

***

### deleteEquipment()

> **deleteEquipment**(`equipmentId`): `Promise`\<`number`\>

Defined in: data/repositories/equipmentRepository.js:119

Delete an equipment item by its ID

#### Parameters

##### equipmentId

`number`

Equipment ID

#### Returns

`Promise`\<`number`\>

Number of deleted rows

#### Throws

If an error occurs during deletion

***

### findById()

> **findById**(`equipmentId`): `Promise`\<`any`\>

Defined in: data/repositories/equipmentRepository.js:153

Find an equipment item by its ID

#### Parameters

##### equipmentId

`number`

Equipment ID

#### Returns

`Promise`\<`any`\>

Equipment item or null

#### Throws

If an error occurs during the query

***

### findByRoom()

> **findByRoom**(`roomId`, `options?`): `Promise`\<`any`[]\>

Defined in: data/repositories/equipmentRepository.js:21

Find all equipment for a specific room

#### Parameters

##### roomId

`number`

Room ID

##### options?

`any` = `{}`

Additional query options

#### Returns

`Promise`\<`any`[]\>

List of equipment items

#### Throws

If an error occurs during the query

***

### findUnlinkedByName()

> **findUnlinkedByName**(`name`): `Promise`\<`any`\>

Defined in: data/repositories/equipmentRepository.js:98

Find an unlinked equipment item by name (case-insensitive)

#### Parameters

##### name

`string`

Equipment name

#### Returns

`Promise`\<`any`\>

Equipment item or null

#### Throws

If an error occurs during the query

***

### getAllEquipments()

> **getAllEquipments**(): `Promise`\<`any`[]\>

Defined in: data/repositories/equipmentRepository.js:40

Retrieve all unique equipment names

#### Returns

`Promise`\<`any`[]\>

List of equipment names

#### Throws

If an error occurs during the query

***

### updateEquipment()

> **updateEquipment**(`equipmentId`, `updates`): `Promise`\<`any`[]\>

Defined in: data/repositories/equipmentRepository.js:81

Update an equipment item

#### Parameters

##### equipmentId

`number`

Equipment ID

##### updates

`any`

Fields to update (name, price, room_id)

#### Returns

`Promise`\<`any`[]\>

[affectedCount, affectedRows]

#### Throws

If an error occurs during the update
