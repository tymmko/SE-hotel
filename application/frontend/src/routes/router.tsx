import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Rooms, Login, Bills, Guests, Reservations } from '../pages';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Rooms />,
	},
	{
		path: '/bills',
		element: <Bills />,
	},
	{
		path: '/guests',
		element: <Guests />,
	},
	{
		path: '/reservations',
		element: <Reservations />,
	},
	{
		path: '/rooms',
		element: <Rooms />,
	},
	{
		path: "/login",
		element: <Login />
	}
]);
