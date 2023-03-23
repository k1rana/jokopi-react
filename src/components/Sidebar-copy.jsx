import React from 'react';

import { slide as Menu } from 'react-burger-menu';

import logo from '../assets/jokopi.svg';

function Sidebar() {
  return (
    <Menu className="a">{logo}</Menu>
    // <Menu className="navbar-body sticky flex flex-col bg-white h-full">
    //   <div className="flex items-center mb-8">
    //     <a className="mr-auto text-3xl font-bold leading-none" href="#">
    //       <img
    //         src={logo}
    //         alt="icon-coffee"
    //         width="50px"
    //         className="align-middle"
    //       />
    //     </a>
    //     <button className="navbar-close">
    //       <svg
    //         className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth="2"
    //           d="M6 18L18 6M6 6l12 12"
    //         ></path>
    //       </svg>
    //     </button>
    //   </div>
    //   <div>
    //     <ul>
    //       <li className="mb-1">
    //         <a
    //           className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
    //           href="#"
    //         >
    //           Home
    //         </a>
    //       </li>
    //       <li className="mb-1">
    //         <a
    //           className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
    //           href="#"
    //         >
    //           Products
    //         </a>
    //       </li>
    //       <li className="mb-1">
    //         <a
    //           className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
    //           href="#"
    //         >
    //           Your Cart
    //         </a>
    //       </li>
    //       <li className="mb-1">
    //         <a
    //           className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
    //           href="#"
    //         >
    //           History
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="mt-auto">
    //     <div className="flex flex-row gap-10 lg:flex select-none w-full justify-center">
    //       <div className="search-section cursor-pointer">
    //         <svg
    //           width="40"
    //           height="40"
    //           viewBox="0 0 17 17"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z"
    //             stroke="#4F5665"
    //             strokeWidth="2"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           />
    //         </svg>
    //       </div>
    //       <a href="" className="chat-link">
    //         <img src="./img/chat.webp" alt="" width="40px" />
    //       </a>
    //       <a href="./profile.html">
    //         <img
    //           src="./img/photo-profile.jpg"
    //           alt=""
    //           width="40px"
    //           className="rounded-full"
    //         />
    //       </a>
    //     </div>
    //     <p className="my-4 text-xs text-center text-gray-400">
    //       <span>Copyright © 2023</span>
    //     </p>
    //   </div>
    // </Menu>
  );
}

export default Sidebar;
