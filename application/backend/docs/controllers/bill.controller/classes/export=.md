[**Backend Logic Documentation v1.0.0**](../../../README.md)

***

[Backend Logic Documentation](../../../README.md) / [controllers/bill.controller](../README.md) / export=

# Class: export=

Defined in: controllers/bill.controller.js:5

Controller for managing bill-related endpoints
Handles HTTP requests and delegates business logic to the BillService

## Constructors

### Constructor

> **new export=**(`billService`): `BillController`

Defined in: controllers/bill.controller.js:9

#### Parameters

##### billService

`BillService`

Service for bill operations

#### Returns

`BillController`

## Methods

### checkOverdueBills()

> **checkOverdueBills**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/bill.controller.js:207

Check for overdue bills

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the count of overdue bills

#### Example

```ts
GET /bills/overdue
```

***

### createBill()

> **createBill**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/bill.controller.js:92

Create a new bill

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the created bill

#### Example

```ts
POST /bills
{
  "user_id": 123,
  "stay_id": 456,
  "total_amount": 100.00,
  "status": "pending"
}
```

***

### getAllBills()

> **getAllBills**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/bill.controller.js:29

Retrieve all bills with optional filters

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the list of bills

#### Example

```ts
// Get all bills
GET /bills
// Get bills by status
GET /bills?status=pending
// Get bills by user
GET /bills?user_id=123
// Get bills by stay
GET /bills?stay_id=456
```

***

### getBill()

> **getBill**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/bill.controller.js:65

Retrieve a single bill by ID

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the bill details

#### Example

```ts
GET /bills/123
```

***

### processPayment()

> **processPayment**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/bill.controller.js:180

Process a payment for a bill

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the updated bill

#### Example

```ts
POST /bills/123/payment
{
  "amount": 100.00,
  "payment_method": "credit_card"
}
```

***

### updateBill()

> **updateBill**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/bill.controller.js:121

Update an existing bill

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the updated bill

#### Example

```ts
PUT /bills/123
{
  "total_amount": 150.00,
  "status": "paid"
}
```

***

### updateBillStatus()

> **updateBillStatus**(`req`, `res`, `next`): `Promise`\<`void`\>

Defined in: controllers/bill.controller.js:148

Update the status of a bill

#### Parameters

##### req

`any`

Express request object

##### res

`any`

Express response object

##### next

`Function`

Express next middleware function

#### Returns

`Promise`\<`void`\>

Sends a JSON response with the updated bill

#### Example

```ts
PATCH /bills/123/status
{
  "status": "paid"
}
```
