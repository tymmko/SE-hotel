[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [services/billService](../README.md) / export=

# Class: export=

Defined in: services/billService.js:5

Service for managing bill-related business logic
Extends BaseService to provide bill-specific operations

## Extends

- `any`

## Constructors

### Constructor

> **new export=**(`billRepository`, `stayRepository`, `reservationRepository`, `roomRepository`, `priceHistoryRepository`): `BillService`

Defined in: services/billService.js:13

#### Parameters

##### billRepository

`BillRepository`

Repository for bill data access

##### stayRepository

`StayRepository`

Repository for stay data access

##### reservationRepository

`ReservationRepository`

Repository for reservation data access

##### roomRepository

`RoomRepository`

Repository for room data access

##### priceHistoryRepository

`PriceHistoryRepository`

Repository for price history data access

#### Returns

`BillService`

#### Overrides

`BaseService.constructor`

## Methods

### checkOverdueBills()

> **checkOverdueBills**(): `Promise`\<`number`\>

Defined in: services/billService.js:230

Check for overdue bills

#### Returns

`Promise`\<`number`\>

Number of overdue bills

#### Throws

If an error occurs during processing

***

### createBill()

> **createBill**(`billData`): `Promise`\<`any`\>

Defined in: services/billService.js:85

Create a new bill

#### Parameters

##### billData

Bill data

###### status?

`string`

Bill status (defaults to 'unpaid')

###### stay_id

`number`

Stay ID

###### total_amount?

`number`

Total amount (calculated if not provided)

#### Returns

`Promise`\<`any`\>

Created bill with details

#### Throws

If stay is not found, amount is invalid, or status is invalid

***

### getAllBillsWithDetails()

> **getAllBillsWithDetails**(): `Promise`\<`any`[]\>

Defined in: services/billService.js:26

Retrieve all bills with associated details

#### Returns

`Promise`\<`any`[]\>

List of bills with details

***

### getBillsByStatus()

> **getBillsByStatus**(`status`): `Promise`\<`any`[]\>

Defined in: services/billService.js:50

Retrieve bills by status

#### Parameters

##### status

`string`

Bill status (e.g., 'paid', 'unpaid')

#### Returns

`Promise`\<`any`[]\>

List of bills with the specified status

#### Throws

If status is invalid

***

### getBillsByStay()

> **getBillsByStay**(`stayId`): `Promise`\<`any`[]\>

Defined in: services/billService.js:63

Retrieve bills associated with a stay

#### Parameters

##### stayId

Stay ID

`string` | `number`

#### Returns

`Promise`\<`any`[]\>

List of bills for the stay

***

### getBillsByUser()

> **getBillsByUser**(`userId`): `Promise`\<`any`[]\>

Defined in: services/billService.js:72

Retrieve bills associated with a user

#### Parameters

##### userId

User ID

`string` | `number`

#### Returns

`Promise`\<`any`[]\>

List of bills for the user

***

### getBillWithDetails()

> **getBillWithDetails**(`billId`): `Promise`\<`any`\>

Defined in: services/billService.js:36

Retrieve a single bill by ID with associated details

#### Parameters

##### billId

Bill ID

`string` | `number`

#### Returns

`Promise`\<`any`\>

Bill with details

#### Throws

If bill is not found

***

### processPayment()

> **processPayment**(`billId`, `paymentData`): `Promise`\<`any`\>

Defined in: services/billService.js:202

Process a payment for a bill

#### Parameters

##### billId

Bill ID

`string` | `number`

##### paymentData

Payment data

###### amount

`number`

Payment amount

###### payment_date?

`Date`

Payment date (defaults to now)

###### payment_method

`string`

Payment method

#### Returns

`Promise`\<`any`\>

Updated bill with details

#### Throws

If bill is not found, payment data is invalid, or amount is invalid

***

### updateBill()

> **updateBill**(`billId`, `billData`): `Promise`\<`any`\>

Defined in: services/billService.js:152

Update an existing bill

#### Parameters

##### billId

Bill ID

`string` | `number`

##### billData

Data to update

###### status?

`string`

Bill status

###### total_amount?

`number`

Total amount

#### Returns

`Promise`\<`any`\>

Updated bill with details

#### Throws

If bill is not found, amount is invalid, or status is invalid

***

### updateBillStatus()

> **updateBillStatus**(`billId`, `status`): `Promise`\<`any`\>

Defined in: services/billService.js:177

Update the status of a bill

#### Parameters

##### billId

Bill ID

`string` | `number`

##### status

`string`

New status

#### Returns

`Promise`\<`any`\>

Updated bill with details

#### Throws

If bill is not found or status is invalid
