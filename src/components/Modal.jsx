// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, children, className }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-[42]"
          onClick={onClose}
        >
          <div className="global-px ">
            <div
              className={`bg-white p-4 rounded-lg shadow-lg ${className}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                className="absolute top-3 right-3 text-gray-800 hover:text-gray-900 focus:outline-none"
                onClick={onClose}
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#EEE"
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
        </div>
      )}
    </>
  );
};

export default Modal;
