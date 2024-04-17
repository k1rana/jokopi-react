/* eslint-disable react/jsx-filename-extension */
import "./styles/index.css";

import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Notification } from "./components/Notification";
import store, { persistor } from "./redux/store";
import Router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
        {/* <RouterProvider router={router} /> */}
        <Notification />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
