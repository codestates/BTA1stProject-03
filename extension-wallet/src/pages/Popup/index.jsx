import React, { createContext, useContext, useState } from 'react'
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
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

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
        element: <Login />,
    },
])
const store = configureStore({
  reducer: {}
})
render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
    window.document.querySelector('#app-container')
)

if (module.hot) module.hot.accept()
