/* eslint-disable react/prop-types */
import React from "react";

import { toast } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "../authUtils";

export const CheckAuth = ({ children }) => {
  if (!isAuthenticated()) {
    toast.error("You must login first!");
    return <Navigate to="/auth/login" replace={true} />;
  }
  return <Outlet />;
};

export const CheckNoAuth = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};
