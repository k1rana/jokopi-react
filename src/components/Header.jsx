import React, { Component } from "react";

import { Link } from "react-router-dom";

import icon from "../assets/jokopi.svg";

class Header extends Component {
  render() {
    return (
      <header className="sticky top-0 z-50 px-22 flex justify-between bg-white border-b-2 border-gray-100">
        <div className="py-8 font-extrabold flex flex-row justify-center gap-4">
          <img src={icon} alt="logo" width="30px" />
          <h1 className="text-xl">jokopi.</h1>
        </div>
        <nav className="py-8 hidden lg:flex flex-row gap-8 justify-center">
          <li className="list-none">
            <a href="/" className="font-bold text-[#6A4029]">
              Home
            </a>
          </li>
          <li className="list-none">
            <a href="/product.html">Product</a>
          </li>
          <li className="list-none">
            <a href="#">Your Cart</a>
          </li>
          <li className="list-none">
            <a href="/history.html">History</a>
          </li>
        </nav>
        <div className="flex-row gap-3 hidden lg:flex items-center select-none py-6">
          <Link to="/login" className="pr-9 font-semibold">
            Login
          </Link>
          <Link to="/register">
            <button className="rounded-[25px] bg-secondary px-10 text-tertiary font-semibold py-2">
              Sign Up
            </button>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
