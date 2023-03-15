import React, { Component } from 'react';

import logo from '../assets/jokopi.svg';

class Footer extends Component {
    render(){
        return(<footer className="bg-[#F8F8F8] px-22 text-[#4f5665]">
        <div className="py-20"></div>
        <div className="flex flex-col-reverse gap-12 md:flex-row">
            <div className="flex flex-col gap-4 md:flex-[2_2_0%]">
                <div className="font-extrabold flex flex-row gap-2">
                    <img src={logo} alt="logo" width="30px"/> <h1 className="text-xl text-black">jokopi.</h1>
                </div>
                <div className="md:w-96">jokopi is a store that sells some good meals, and especially coffee. We provide high quality beans</div>
                <div className="flex flex-row gap-5">
                    <a href="#" className="bg-secondary h-[35px] w-[35px] flex items-center justify-center rounded-full">IMG</a>
                    <a href="#" className="bg-secondary h-[35px] w-[35px] flex items-center justify-center rounded-full">IMG</a>
                    <a href="#" className="bg-secondary h-[35px] w-[35px] flex items-center justify-center rounded-full">IMG</a>
                </div>
                <div className="copyright">(c) 2023 jokopi</div>
            </div>
            <nav className="flex flex-row gap-10 md:flex-1">
                <div className="flex-1 flex flex-col gap-5">
                    <div className="grid-item">
                        <h4 className="font-bold">Product</h4>
                    </div> 
                    <div className="flex flex-col gap-2">
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer"> Download</a></div>
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer">Pricing</a></div>
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer">Locations</a></div>
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer">Countries</a></div>
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer">Blog</a></div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-5">
                    <div className="grid-item">
                        <h4 className="font-bold">Engage</h4>
                    </div> 
                    <div className="flex flex-col gap-2">
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer">Coffee Shop ?</a></div>
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer">FAQ</a></div>
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer">About Us</a></div>
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer">Privacy Policy</a></div>
                        <div className="grid-item"><a href="https://" target="_blank" rel="noopener noreferrer">Terms of Services</a></div>
                    </div>
                </div>
            </nav>
        </div>
        <div className="py-5"></div>
    </footer>);
    }
}

export default Footer;