[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/auth.api](../README.md) / loginUser

# Function: loginUser()

> **loginUser**(`username`, `password`): `Promise`\<`any`\>

Defined in: src/api/auth.api.ts:15

Sends a login request to the backend API.

## Parameters

### username

`string`

The user's username.

### password

`string`

The user's password.

## Returns

`Promise`\<`any`\>

A promise that resolves with the response data containing user and token info.

## Example

```ts
const data = await loginUser("admin", "admin123");
console.log(data.token);
```
