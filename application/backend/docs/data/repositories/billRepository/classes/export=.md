[**Backend Logic Documentation v1.0.0**](../../../../README.md)

***

[Backend Logic Documentation](../../../../README.md) / [data/repositories/billRepository](../README.md) / export=

# Class: export=

Defined in: data/repositories/billRepository.js:5

Repository for managing bill-related data operations
Extends BaseRepository to provide bill-specific data access methods

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`models`): `BillRepository`

Defined in: data/repositories/billRepository.js:9

#### Parameters

##### models

`any`

Sequelize models

#### Returns

`BillRepository`

#### Overrides

`BaseRepository.constructor`

## Methods

### createPayment()

> **createPayment**(`billId`, `paymentData`): `Promise`\<`any`\>

Defined in: data/repositories/billRepository.js:190

Create a payment for a bill

#### Parameters

##### billId

Bill ID

`string` | `number`

##### paymentData

`any`

Payment data

#### Returns

`Promise`\<`any`\>

Created payment

#### Throws

If an error occurs during creation

***

### findBillsByStatus()

> **findBillsByStatus**(`status`): `Promise`\<`any`[]\>

Defined in: data/repositories/billRepository.js:95

Find bills by status

#### Parameters

##### status

`string`

Bill status (e.g., 'paid', 'unpaid')

#### Returns

`Promise`\<`any`[]\>

List of bills with the specified status

#### Throws

If an error occurs during the query

***

### findBillsByStay()

> **findBillsByStay**(`stayId`): `Promise`\<`any`[]\>

Defined in: data/repositories/billRepository.js:110

Find bills associated with a stay

#### Parameters

##### stayId

Stay ID

`string` | `number`

#### Returns

`Promise`\<`any`[]\>

List of bills for the stay

#### Throws

If an error occurs during the query

***

### findBillsByUser()

> **findBillsByUser**(`userId`): `Promise`\<`any`[]\>

Defined in: data/repositories/billRepository.js:125

Find bills associated with a user

#### Parameters

##### userId

User ID

`string` | `number`

#### Returns

`Promise`\<`any`[]\>

List of bills for the user

#### Throws

If an error occurs during the query

***

### findBillsWithDetails()

> **findBillsWithDetails**(`options?`): `Promise`\<`any`[]\>

Defined in: data/repositories/billRepository.js:20

Find all bills with associated details

#### Parameters

##### options?

`any` = `{}`

Additional query options

#### Returns

`Promise`\<`any`[]\>

List of bills with related data

#### Throws

If an error occurs during the query

***

### findBillWithDetails()

> **findBillWithDetails**(`billId`): `Promise`\<`any`\>

Defined in: data/repositories/billRepository.js:58

Find a single bill by ID with associated details

#### Parameters

##### billId

Bill ID

`string` | `number`

#### Returns

`Promise`\<`any`\>

Bill with related data

#### Throws

If an error occurs during the query

***

### getTotalPaymentsForBill()

> **getTotalPaymentsForBill**(`billId`): `Promise`\<`number`\>

Defined in: data/repositories/billRepository.js:208

Calculate the total payments for a bill

#### Parameters

##### billId

Bill ID

`string` | `number`

#### Returns

`Promise`\<`number`\>

Total payment amount

#### Throws

If an error occurs during the query

***

### updateBillStatus()

> **updateBillStatus**(`billId`, `status`): `Promise`\<`any`[]\>

Defined in: data/repositories/billRepository.js:169

Update the status of a bill

#### Parameters

##### billId

Bill ID

`string` | `number`

##### status

`string`

New status

#### Returns

`Promise`\<`any`[]\>

[affectedCount, affectedRows]

#### Throws

If an error occurs during the update
