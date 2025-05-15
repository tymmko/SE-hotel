[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [routes/router](../README.md) / router

# Variable: router

> `const` **router**: `Router`

Defined in: src/routes/router.tsx:13

Application routing configuration using React Router v6's `createBrowserRouter`.

## Remarks

Most routes are protected via the `ProtectedRoute` wrapper, requiring authentication.
Some paths (e.g. `/rooms/create`) use `requireAdmin` to enforce admin-only access.
