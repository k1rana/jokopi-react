import React from 'react';

import { NavLink } from 'react-router-dom';

import logo from '../assets/jokopi.svg';

function Sidebar({ onClose }) {
  return (
    <>
      <div className="h-full">
        <div className="p-5 flex flex-col h-full">
          <div className="flex flex-row items-center mb-8">
            <a className="mr-auto text-1xl font-bold leading-none" href="#">
              <img
                src={logo}
                alt="icon-coffee"
                width="50px"
                className="align-middle"
              />
            </a>
            <button className="navbar-close" onClick={onClose}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <NavLink
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-tertiary/40 hover:text-tertiary rounded"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-tertiary/40 hover:text-tertiary rounded"
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-tertiary/40 hover:text-tertiary rounded"
                  to="/cart"
                >
                  Your Cart
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-tertiary/40 hover:text-tertiary rounded"
                  to="/history"
                >
                  History
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <NavLink
                className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl shadow-md"
                to="/auth/login"
              >
                Login
              </NavLink>
              <NavLink
                className="block px-4 py-3 mb-2 leading-loose text-xs text-center font-semibold bg-secondary hover:bg-blue-700  rounded-xl shadow-md"
                to="/auth/register"
              >
                Sign Up
              </NavLink>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2023</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
