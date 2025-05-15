[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/auth.api](../README.md) / registerUser

# Function: registerUser()

> **registerUser**(`username`, `email`, `password`): `Promise`\<`any`\>

Defined in: src/api/auth.api.ts:31

Sends a registration request to the backend API.

## Parameters

### username

`string`

Desired username for the new user.

### email

`string`

Email address of the new user.

### password

`string`

Password to associate with the account.

## Returns

`Promise`\<`any`\>

A promise that resolves with the response data, typically the new user record.

## Example

```ts
const newUser = await registerUser("jane_doe", "jane@example.com", "secret123");
```
