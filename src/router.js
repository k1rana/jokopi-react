import React from "react";

import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
