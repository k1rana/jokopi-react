import React, {
  Component,
  useContext,
} from 'react';

import { toast } from 'react-hot-toast';
import {
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';

import burgerIcon from '../assets/icons/burger-menu-left.svg';
import chatIcon from '../assets/icons/chat.svg';
import placeholderProfile from '../assets/images/placeholder-profile.jpg';
import logo from '../assets/jokopi.svg';
import {
  getUserData,
  isAuthenticated,
  logout,
} from '../utils/authUtils';
import Sidebar from './Sidebar';

// create a navigation component that wraps the burger menu
const Navigation = () => {
  const ctx = useContext(MyContext);

  return (
    <Sidebar
      customBurgerIcon={false}
      isOpen={ctx.isMenuOpen}
      onStateChange={(state) => ctx.stateChangeHandler(state)}
    />
  );
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
    };
    this.dropdownRef = React.createRef();
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  navigateTo(path) {
    const navigate = useNavigate();
    navigate(path);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  toggleDropdown() {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  }

  limitCharacters(str) {
    if (str.length > 20) {
      return str.substring(0, 20) + "...";
    }
    return str;
  }

  logoutHandler() {
    toast.dismiss();
    if (logout()) {
      toast.success("Logout has been successful! See ya!");
    } else {
      toast.error("Something went wrong, please reload your page!");
    }
  }

  handleClickOutside(event) {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(event.target)
    ) {
      this.setState({
        isDropdownOpen: false,
      });
    }
  }

  render() {
    return (
      <>
        {/* <Sidebar
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        /> */}
        <header className="sticky top-0 z-50 px-10 lg:px-22 flex justify-between bg-white border-b-2 border-gray-100">
          <div className="py-8 font-extrabold">
            <Link to="/" className=" flex flex-row justify-center gap-4">
              <img src={logo} alt="logo" width="30px" />
              <h1 className="text-xl">jokopi.</h1>
            </Link>
          </div>
          <div className="navbar-burger select-none cursor-pointer lg:hidden py-8">
            <button onClick={() => this.toggleMenu()}>
              <img
                src={burgerIcon}
                width="30px"
                className="aspect-square"
                alt=""
              />
            </button>
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
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "font-bold text-[#6A4029]" : ""
                }
              >
                Your Cart
              </NavLink>
            </li>
            <li className="list-none" key="History">
              <a href="#">History</a>
            </li>
          </nav>
          {isAuthenticated() ? (
            <div className="flex-row gap-10 hidden lg:flex select-none py-8">
              <div className="search-section cursor-pointer">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z"
                    stroke="#4F5665"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <a href="" className="relative">
                <div className="absolute -left-2 -top-2 h-4 w-4 bg-tertiary rounded-full text-white flex text-[0.70rem] items-center justify-center font-extrabold">
                  9+
                </div>
                <img src={chatIcon} alt="" width="30px" />
              </a>
              <div
                href="./profile.html"
                className="relative"
                ref={this.dropdownRef}
              >
                <img
                  src={placeholderProfile}
                  alt=""
                  width="30px"
                  className="rounded-full cursor-pointer"
                  onClick={this.toggleDropdown}
                />
                <div
                  className={`dropdown ${
                    this.state.isDropdownOpen
                      ? "transition duration-300 ease-in-out opacity-100 transform -translate-y-6"
                      : "transition duration-200 ease-in-out opacity-0 transform -translate-y-10 invisible"
                  }`}
                >
                  {this.state.isDropdownOpen && (
                    <nav className="absolute list-none bg-white rounded-lg shadow-md border-1 border-gray-200 flex flex-col right-0 top-10 py-2 divide-y-1 transition-all duration-200 transform origin-top-right min-w-[14rem]">
                      <div className="px-4 py-1">
                        <p>Signed in as</p>
                        <p className="font-medium">
                          {this.limitCharacters(getUserData().email)}
                        </p>
                      </div>
                      <div className="py-1">
                        <a
                          className="block px-4 py-2 hover:bg-gray-100  duration-200"
                          href="#"
                        >
                          Profile
                        </a>
                        <a
                          className="block px-4 py-2 hover:bg-gray-100 duration-200"
                          href="#"
                        >
                          My Cart
                        </a>
                      </div>
                      <div className="py-1">
                        <a
                          className="block px-4 py-2 hover:bg-gray-100 duration-200 cursor-pointer"
                          onClick={this.logoutHandler}
                        >
                          Sign out
                        </a>
                      </div>
                    </nav>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex flex-row gap-3 items-center select-none py-6">
              <Link to="/auth/login" className="mr-9 font-semibold">
                Login
              </Link>
              <Link to="/auth/register">
                <button className="rounded-[25px] bg-secondary px-10 text-tertiary font-semibold py-2 hover:bg-secondary-200 duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </header>
      </>
    );
  }
}

export default Header;
