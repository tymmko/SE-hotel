[**Frontend Logic Documentation v0.1.0**](../../../README.md)

***

[Frontend Logic Documentation](../../../modules.md) / [api/api](../README.md) / default

# Variable: default

> `const` **default**: `AxiosInstance`

Defined in: src/api/api.ts:14

Axios instance pre-configured to use the application's API base URL.

The base URL is taken from the environment variable `API_BASE_URL`
and defaults to `/api` if not set. All API requests from the frontend
should go through this instance.

## Remarks

This instance also adds an `Authorization` header with a bearer token,
if available in local storage under the key `'token'`.
