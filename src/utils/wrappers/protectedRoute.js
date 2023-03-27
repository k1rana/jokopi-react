import React from 'react';

import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  if (!token) {
    return <Navigate to="/home" replace />;
  }
  return children;
};
