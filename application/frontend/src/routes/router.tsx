import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            // TODO
        ],
    },
]);