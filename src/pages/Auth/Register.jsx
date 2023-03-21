import React from "react";

import { Link } from "react-router-dom";

import icon from "../../assets/jokopi.svg";
import AuthFooter from "../../components/AuthFooter";

const Register = () => {
  return (
    <>
      <main>
        <div className="flex flex-col lg:flex-row">
          <section className="w-0 min-h-screen lg:w-1/2 lg:block hidden bg-cover bg-center bg-main"></section>
          <section className="lg:w-1/2 bg-main bg-cover bg-center bg-black/70 lg:bg-white lg:bg-none lg:text-black">
            <div className=" px-4 py-7 lg:px-16 flex justify-center flex-col">
              <div className="bg-white px-5 py-6 lg:p-0 rounded-xl">
                <header className="flex justify-between mb-10">
                  <Link to="/">
                    <div className="font-extrabold flex flex-row justify-center gap-4">
                      <img src={icon} alt="logo" width="30px" />
                      <h1 className="text-xl">jokopi.</h1>
                    </div>
                  </Link>
                  <div className="text-xl font-semibold text-tertiary">
                    Login
                  </div>
                </header>
                <section className="mt-16">
                  <form
                    action=""
                    method="post"
                    className="space-y-4 md:space-y-6 relative"
                  >
                    <div>
                      <label
                        name="email"
                        htmlFor="email"
                        className="text-[#4F5665] font-bold"
                      >
                        Email address :
                      </label>
                      <input
                        type="text"
                        name=""
                        id="email"
                        className="border-gray-400 border-2 rounded-2xl p-3 w-full mt-2"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label
                        name="email"
                        htmlFor="email"
                        className="text-[#4F5665] font-bold"
                      >
                        Password :
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="border-gray-400 border-2 rounded-2xl p-3 w-full mt-2"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div>
                      <label
                        name="phoneNumber"
                        htmlFor="phoneNumber"
                        className="text-[#4F5665] font-bold"
                      >
                        Phone Number :
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        className="border-gray-400 border-2 rounded-2xl p-3 w-full mt-2"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
                    >
                      Signup
                    </button>
                    <button
                      type="submit"
                      className="w-full text-tertiary bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl inline-flex justify-center items-center"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt=""
                        width="23px"
                        className="w  -5 h-5 mr-2"
                      />
                      <span>Signup with Google</span>
                    </button>
                    <div className="inline-flex items-center justify-center w-full">
                      <hr className="w-full h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
                      <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 w-64">
                        Already have a account?
                      </span>
                    </div>
                    <Link to="/login">
                      <button className="w-full text-white bg-tertiary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl lg:mb-20">
                        Login here
                      </button>
                    </Link>
                  </form>
                </section>
              </div>
            </div>
            <AuthFooter />
          </section>
        </div>
      </main>
    </>
  );
};

export default Register;
