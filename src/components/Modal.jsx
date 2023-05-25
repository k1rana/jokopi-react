// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
          onClick={onClose}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="absolute top-2 right-2 text-gray-800 hover:text-gray-900 focus:outline-none"
              onClick={onClose}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
