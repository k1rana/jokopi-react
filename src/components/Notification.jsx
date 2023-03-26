import React from 'react';

import {
  toast,
  ToastBar,
  Toaster,
} from 'react-hot-toast';

export const Notification = () => {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      toastOptions={{
        className: "",
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)}>X</button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
