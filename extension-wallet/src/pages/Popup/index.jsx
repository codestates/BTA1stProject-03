import React from 'react'
import { render } from 'react-dom'

import Popup from './Popup'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import CreateWallet from './pages/createWallet'
import ImportWallet from './pages/importWallet'
import User from './pages/user'
import { userLoader } from './loader/user'
import Send from './pages/send'
import Login from './pages/login'

// create router
const router = createHashRouter([
    {
        path: '/',
        element: <Popup />,
    },
    {
        path: '/create',
        element: <CreateWallet />,
    },
    {
        path: '/import',
        element: <ImportWallet />,
    },
    {
        path: '/send',
        element: <Send />,
    },
    {
        path: '/user',
        element: <User />,
        loader: userLoader,
    },
    {
        path: '/login',
        element: <Login/>
    }
])

render(
    <RouterProvider router={router} />,
    window.document.querySelector('#app-container')
)

if (module.hot) module.hot.accept()
