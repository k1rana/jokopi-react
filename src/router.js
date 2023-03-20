import React from "react";

import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import Products from "./pages/Products";

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
    element: <Products title="Products - jokopi" />,
  },
]);

export default router;
