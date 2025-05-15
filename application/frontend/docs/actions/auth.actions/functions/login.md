[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [actions/auth.actions](../README.md) / login

# Function: login()

> **login**(`username`, `password`): (`dispatch`) => `Promise`\<`void`\>

Defined in: src/actions/auth.actions.ts:18

Asynchronous thunk action that logs in a user.

Sends credentials to the backend, stores the received token and user info
in `localStorage`, and dispatches a success or error action.

## Parameters

### username

`string`

The user's username.

### password

`string`

The user's password.

## Returns

A thunk function that performs the login flow.

> (`dispatch`): `Promise`\<`void`\>

### Parameters

#### dispatch

`ThunkDispatch`\<\{ `authReducer`: `AuthState`; `BillsReducer`: `BillsStoreType`; `EquipmentsReducer`: `EquipmentsStoreType`; `GuestReducer`: `GuestStoreType`; `ReservationReducer`: `ReservationStoreType`; `RoomsReducer`: `RoomsStoreType`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`any`\>

### Returns

`Promise`\<`void`\>

## Example

```ts
dispatch(login("admin", "password123"));
```
