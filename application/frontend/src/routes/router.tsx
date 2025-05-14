import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Rooms, Login, Bills, Guests, Reservations, SignUp, EditPriceHistory, CreateRoom } from '../pages';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Rooms />
			</ProtectedRoute>
		),
	},
	{
		path: '/bills',
		element: (
			<ProtectedRoute>
				<Bills />
			</ProtectedRoute>
		),
	},
	{
		path: '/guests',
		element: (
			<ProtectedRoute>
				<Guests />
			</ProtectedRoute>
		),
	},
	{
		path: '/reservations',
		element: (
			<ProtectedRoute>
				<Reservations />
			</ProtectedRoute>
		),
	},
	{
		path: '/rooms',
		element: (
			<ProtectedRoute>
				<Rooms />
			</ProtectedRoute>
		),
	},
	{
		path: '/rooms/create',
		element: (
			<ProtectedRoute requireAdmin>
				<CreateRoom />
			</ProtectedRoute>
		),
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
]);