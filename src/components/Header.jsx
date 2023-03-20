import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";

import burgerIcon from "../assets/icons/burger-menu-left.svg";
import logo from "../assets/jokopi.svg";

class Header extends Component {
  render() {
    return (
      <header className="sticky top-0 z-50 px-10 lg:px-22 flex justify-between bg-white border-b-2 border-gray-100">
        <div className="py-8 font-extrabold">
          <Link to="/" className=" flex flex-row justify-center gap-4">
            <img src={logo} alt="logo" width="30px" />
            <h1 className="text-xl">jokopi.</h1>
          </Link>
        </div>
        <div className="navbar-burger select-none cursor-pointer lg:hidden py-8">
          <img src={burgerIcon} width="30px" height="30px" alt="" />
        </div>
        <nav className="py-8 hidden lg:flex flex-row gap-8 justify-center">
          <li className="list-none" key="Home Page">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-bold text-[#6A4029]" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li className="list-none" key="Product">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "font-bold text-[#6A4029]" : ""
              }
            >
              Products
            </NavLink>
          </li>
          <li className="list-none" key="Cart">
            <a href="#">Your Cart</a>
          </li>
          <li className="list-none" key="History">
            <a href="#">History</a>
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
