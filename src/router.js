import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Auth from "./pages/Auth";
import ForgotPass from "./pages/Auth/ForgotPass";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from "./pages/Cart";
import NotFound from "./pages/Error";
import Mainpage from "./pages/Mainpage";
import Products from "./pages/Products";
import ProductDetail from "./pages/Products/ProductDetail";
import Profile from "./pages/Profile";
import { CheckAuth, CheckNoAuth } from "./utils/wrappers/protectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NotFound />}>
      {/* Public Route */}
      <Route index element={<Mainpage />} />
      <Route path="products/*" element={<Products title="Products" />}>
        <Route path="category/:id" />
      </Route>
      <Route path="products/detail/:productId" element={<ProductDetail />} />

      {/* Route which must not logged in */}
      <Route
        path="auth"
        element={
          <CheckNoAuth>
            <Auth />
          </CheckNoAuth>
        }
      >
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpass" element={<ForgotPass />} />
      </Route>

      {/* Route which must logged in */}
      <Route element={<CheckAuth />}>
        <Route path="profile" element={<Profile title="User Profile" />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Route>
  )
);

export default router;
