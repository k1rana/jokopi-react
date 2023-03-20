import React from "react";

import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
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
]);

export default router;
