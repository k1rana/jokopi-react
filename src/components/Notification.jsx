import React from "react";

import { Toaster } from "react-hot-toast";

export const Notification = () => {
  return (
    <Toaster
      position="top-left"
      reverseOrder={false}
      toastOptions={{
        className: "",
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      }}
    />
  );
};
