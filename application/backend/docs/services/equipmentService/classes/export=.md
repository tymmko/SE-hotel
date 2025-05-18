[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [services/equipmentService](../README.md) / export=

# Class: export=

Defined in: services/equipmentService.js:5

Service for managing equipment-related business logic
Extends BaseService to provide equipment-specific operations

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`equipmentRepository`, `roomRepository`): `EquipmentService`

Defined in: services/equipmentService.js:10

#### Parameters

##### equipmentRepository

`EquipmentRepository`

Repository for equipment data

##### roomRepository

`RoomRepository`

Repository for room data

#### Returns

`EquipmentService`

#### Overrides

`BaseService.constructor`

## Methods

### addEquipment()

> **addEquipment**(`roomId`, `name`, `price`): `Promise`\<`any`\>

Defined in: services/equipmentService.js:47

Add new equipment to a room

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

Created equipment

#### Throws

If room is not found or data is invalid

***

### addOrReuseEquipment()

> **addOrReuseEquipment**(`roomId`, `name`, `price`): `Promise`\<`any`\>

Defined in: services/equipmentService.js:68

Add or reuse existing equipment for a room

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

Created or reused equipment

#### Throws

If room is not found or data is invalid

***

### deleteAllByRoom()

> **deleteAllByRoom**(`roomId`): `Promise`\<`number`\>

Defined in: services/equipmentService.js:147

Delete all equipment for a specific room

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`number`\>

Number of deleted equipment items

#### Throws

If room is not found

***

### deleteEquipment()

> **deleteEquipment**(`equipmentId`): `Promise`\<`boolean`\>

Defined in: services/equipmentService.js:131

Delete an equipment item

#### Parameters

##### equipmentId

`number`

Equipment ID

#### Returns

`Promise`\<`boolean`\>

True if deletion was successful

#### Throws

If equipment is not found

***

### getAllEquipments()

> **getAllEquipments**(): `Promise`\<`any`[]\>

Defined in: services/equipmentService.js:34

Retrieve all equipment names

#### Returns

`Promise`\<`any`[]\>

List of equipment names

***

### getEquipmentByRoom()

> **getEquipmentByRoom**(`roomId`): `Promise`\<`any`[]\>

Defined in: services/equipmentService.js:21

Retrieve all equipment for a specific room

#### Parameters

##### roomId

`number`

Room ID

#### Returns

`Promise`\<`any`[]\>

List of equipment items

#### Throws

If room is not found

***

### unlinkEquipment()

> **unlinkEquipment**(`equipmentId`): `Promise`\<`any`\>

Defined in: services/equipmentService.js:116

Unlink an equipment item from its room (soft delete)

#### Parameters

##### equipmentId

`number`

Equipment ID

#### Returns

`Promise`\<`any`\>

Updated equipment

#### Throws

If equipment is not found

***

### updateEquipment()

> **updateEquipment**(`equipmentId`, `updates`): `Promise`\<`any`\>

Defined in: services/equipmentService.js:96

Update an equipment item

#### Parameters

##### equipmentId

`number`

Equipment ID

##### updates

Fields to update

###### name?

`string`

New equipment name

###### price?

`number`

New equipment price

#### Returns

`Promise`\<`any`\>

Updated equipment

#### Throws

If equipment is not found or no fields are provided
