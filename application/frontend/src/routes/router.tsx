import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Rooms, Login } from '../pages';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Rooms />,
	},
	{
		path: "/login",
		element: <Login />
	}
]);