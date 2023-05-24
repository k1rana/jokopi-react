import React from 'react';

import { Link } from 'react-router-dom';

import fbLogo from '../assets/icons/facebook.svg';
import igLogo from '../assets/icons/instagram.svg';
import twLogo from '../assets/icons/twitter.svg';
import logo from '../assets/jokopi.svg';

const AuthFooter = () => {
  return (
    <>
      <footer className="bg-[#F8F8F8] text-[#4f5665]">
        <div className="global-px lg:px-16">
          <div className="py-5  md:py-10"></div>
          <div className="flex flex-col-reverse gap-12 md:flex-row">
            <div className="flex flex-col gap-4 md:max-w-[50%]">
              <Link to="/">
                <div className="font-extrabold flex flex-row gap-2">
                  <img src={logo} alt="logo" width="30px" />{" "}
                  <h1 className="text-xl text-black">jokopi.</h1>
                </div>
              </Link>
              <div className="">
                jokopi is a store that sells some good meals, and especially
                coffee. We provide high quality beans
              </div>
              <div className="flex flex-row gap-5">
                <a
                  href="#"
                  className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                  aria-label="Facebook"
                >
                  <img src={fbLogo} alt="" />
                </a>
                <a
                  href="#"
                  className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                  aria-label="Instagram"
                >
                  <img src={igLogo} alt="" />
                </a>
                <a
                  href="#"
                  className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                  aria-label="Twitter"
                >
                  <img src={twLogo} alt="" width="120%" className="w-16" />
                </a>
              </div>
              <div className="copyright">(c) 2023 jokopi</div>
            </div>
            <nav className="flex flex-row lg:flex-col gap-10 md:flex-1">
              <div className="flex-1 flex flex-col gap-5">
                <div className="grid-item">
                  <p className="font-bold">Product</p>
                </div>
                <div className="flex flex-col gap-2  lg:flex-row lg:gap-x-10 lg:gap-y-4 flex-wrap w-full">
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      {" "}
                      Download
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Pricing
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Locations
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Countries
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Blog
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="grid-item">
                  <p className="font-bold">Engage</p>
                </div>
                <div className="flex flex-col gap-2  lg:flex-row lg:gap-x-10 lg:gap-y-4 flex-wrap w-full text-base">
                  <div className="grid-item flex-1 min-w-[5rem]">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Coffee Shop?
                    </a>
                  </div>
                  <div className="grid-item flex-1 min-w-[5rem]">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      FAQ
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      About Us
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Terms of Services
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="py-5"></div>
        </div>
      </footer>
    </>
  );
};

export default AuthFooter;
