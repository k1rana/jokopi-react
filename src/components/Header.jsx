import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import icon from '../assets/jokopi.svg';

class Header extends Component {
    render(){
        return(
            <header className="px-22 flex justify-between"><div className="py-10 font-extrabold flex flex-row justify-center gap-4"> <img src={icon} alt="logo" width="30px" /> <h1 className="text-xl">jokopi.</h1>
        </div><nav className="py-10 hidden lg:flex flex-row gap-8 justify-center">
            <li className="list-none"><a href="/" className="font-bold text-[#6A4029]">Home</a></li>
            <li className="list-none"><a href="/product.html">Product</a></li>
            <li className="list-none"><a href="#">Your Cart</a></li>
            <li className="list-none"><a href="/history.html">History</a></li>
        </nav>
        <div className="flex-row gap-3 hidden lg:flex items-center select-none py-8">
            <Link to="/login" className='pr-9 font-semibold'>Login</Link>
            <button className='rounded-[25px] bg-secondary px-10 text-tertiary font-semibold h-full'>Sign Up</button>
            </div></header>);
    }
}

export default Header;