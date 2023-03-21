import React from "react";

import { createBrowserRouter } from "react-router-dom";

import ForgotPass from "./pages/Auth/ForgotPass";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Mainpage from "./pages/Mainpage";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: <Products title="Products" />,
  },
  {
    path: "/profile",
    element: <Profile title="User Profile" />,
  },
  {
    path: "/products/detail/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/signup/",
    element: <Register />,
  },
  {
    path: "/forgotpass/",
    element: <ForgotPass />,
  },
]);

export default router;
