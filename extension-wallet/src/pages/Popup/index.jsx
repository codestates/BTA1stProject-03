import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import CreateWallet from "./pages/createWallet"


// create router
const router = createHashRouter([
    {
        path: "/",
        element: <Popup />,
    },
    {
        path: "/create",
        element: <CreateWallet/>
    }
])




render(<RouterProvider router={router}/>, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
