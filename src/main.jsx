import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RegisterPage from './pages/credentialPage/RegisterPage.jsx'
import LoginPage from './pages/credentialPage/LoginPage.jsx'
import DashboardPage from './pages/dashboardPage/DashboardPage.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import ItemsPage from './pages/dashboardPage/ItemsPage.jsx'
import UsersPage from './pages/dashboardPage/UsersPage.jsx'
import NotificationPage from './pages/dashboardPage/NotificationPage.jsx'
import ReportPage from './pages/dashboardPage/ReportPage.jsx'
import TransactionsPage from './pages/dashboardPage/TransactionsPage.jsx'
import CategoriesPage from './pages/dashboardPage/CategoriesPage.jsx'

const router = createBrowserRouter([
  { 
    path: '/',
    element:<App/>,
    children:[
      {
        path:'/register',
        element:<RegisterPage/>
      },
      {
        path:'/login',
        element:<LoginPage/>
      }
    ]
    },
    {
      path:'/dashboard',
      element:<DashboardPage/>,
      children:[
        {
          path:"/dashboard/items",
          element:<ItemsPage/>
        },
        {
          path:"/dashboard/users",
          element:<UsersPage/>
        },
        {
          path:"/dashboard/notifications",
          element:<NotificationPage/>
        },
        {
          path:"/dashboard/reports",
          element:<ReportPage/>
        },
        {
          path:"/dashboard/transactions",
          element:<TransactionsPage/>
        },
        {
          path:"/dashboard/categories",
          element:<CategoriesPage/>
        }
      ]
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>

    </RouterProvider>
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
)
