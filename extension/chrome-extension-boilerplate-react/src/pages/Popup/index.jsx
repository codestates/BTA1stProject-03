import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';


const router = createHashRouter([
    {
        path: "/",
        element: <Popup />,
    }
])



render(<RouterProvider router={router}/>, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
