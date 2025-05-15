[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/auth.actions](../README.md) / register

# Function: register()

> **register**(`username`, `email`, `password`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/actions/auth.actions.ts:45

Asynchronous thunk action that registers a new user.

Sends registration data to the backend, stores the returned token and user info
in `localStorage`, and dispatches a success or error action.

## Parameters

### username

`string`

Desired username for the new account.

### email

`string`

Email address of the new user.

### password

`string`

Password for the account.

## Returns

A thunk function that performs the registration flow.

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Example

```ts
dispatch(register("jane_doe", "jane@example.com", "secret123"));
```
