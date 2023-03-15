import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import Mainpage from './pages/Mainpage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
]);

export default router;
