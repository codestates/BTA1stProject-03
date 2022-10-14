import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Root from './pages/root'

const router = createHashRouter([
    {
        path: '/',
        element: <Root />,
        loader: null,
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
