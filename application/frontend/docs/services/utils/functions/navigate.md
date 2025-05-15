[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [services/utils](../README.md) / navigate

# Function: navigate()

> **navigate**(`path`): `void`

Defined in: src/services/utils.tsx:15

Navigates to a new URL path without reloading the page.

## Parameters

### path

`string`

The path to navigate to (e.g., `/rooms`, `/login`)

## Returns

`void`

## Remarks

This is a custom navigation function that mimics SPA behavior using the
History API and manually dispatches a `popstate` event to notify listeners.

## Example

```ts
navigate('/dashboard');
```
