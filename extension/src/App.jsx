import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Root from './pages/root'

// https://reactrouter.com/en/main/routers/create-hash-router
// 크롬익스텐션에서는 해시 라우터 사용
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
