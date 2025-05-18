import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Rooms, Login, Bills, Guests, Reservations, SignUp, CreateRoom } from '../pages';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * Application routing configuration using React Router v6's `createBrowserRouter`.
 *
 * @remarks
 * Most routes are protected via the `ProtectedRoute` wrapper, requiring authentication.
 * Some paths (e.g. `/rooms/create`) use `requireAdmin` to enforce admin-only access.
 */
export const router = createBrowserRouter([
	{
		/** Default route redirects to the room listing if authenticated. */
		path: '/',
		element: (
			<ProtectedRoute>
				<Rooms />
			</ProtectedRoute>
		),
	},
	{
		/** Route for the bills overview. */
		path: '/bills',
		element: (
			<ProtectedRoute>
				<Bills />
			</ProtectedRoute>
		),
	},
	{
		/** Route for listing guests. */
		path: '/guests',
		element: (
			<ProtectedRoute>
				<Guests />
			</ProtectedRoute>
		),
	},
	{
		/** Route for managing reservations. */
		path: '/reservations',
		element: (
			<ProtectedRoute>
				<Reservations />
			</ProtectedRoute>
		),
	},
	{
		/** Route for listing rooms. Also available at root. */
		path: '/rooms',
		element: (
			<ProtectedRoute>
				<Rooms />
			</ProtectedRoute>
		),
	},
	{
		/** Admin-only route for creating a new room. */
		path: '/rooms/create',
		element: (
			<ProtectedRoute requireAdmin>
				<CreateRoom />
			</ProtectedRoute>
		),
	},
	{
		/** Public route for user login. */
		path: '/login',
		element: <Login />,
	},
	{
		/** Public route for user registration. */
		path: '/signup',
		element: <SignUp />,
	},
]);
