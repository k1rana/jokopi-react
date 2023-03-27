import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import Auth from './pages/Auth';
import ForgotPass from './pages/Auth/ForgotPass';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Mainpage from './pages/Mainpage';
import Products from './pages/Products';
import ProductDetail from './pages/Products/ProductDetail';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgotpass",
        element: <ForgotPass />,
      },
    ],
  },
  {
    path: "/products/*",
    element: <Products title="Products" />,
    children: [
      {
        path: "category/:id",
        element: null,
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile title="User Profile" />,
  },
  {
    path: "/products/detail/:productId",
    element: <ProductDetail />,
  },
]);

export default router;
