import React from "react";

import { Link } from "react-router-dom";

import icon from "../../assets/jokopi.svg";
import AuthFooter from "../../components/AuthFooter";

const ForgotPass = () => {
  return (
    <>
      <main>
        <div className="flex flex-col lg:flex-row">
          <section className="w-0 min-h-screen lg:w-1/2 lg:block hidden bg-cover bg-center bg-main"></section>
          <section className="lg:w-1/2 bg-main bg-cover bg-center bg-black/70 lg:bg-white lg:bg-none lg:text-black">
            <div className=" px-4 py-7 lg:px-16 flex justify-center flex-col">
              <div className="bg-white px-5 py-6 lg:p-0 rounded-xl">
                <header className="flex justify-center mb-10">
                  <Link to="/">
                    <div className="font-extrabold flex flex-row justify-center gap-4">
                      <img src={icon} alt="logo" width="30px" />
                      <h1 className="text-xl">jokopi.</h1>
                    </div>
                  </Link>
                </header>
                <section className="mt-16">
                  <form
                    action=""
                    method="post"
                    className="space-y-4 md:space-y-6 relative"
                  >
                    <div className="space-y-5">
                      <h2 className="font-bold text-3xl text-center">
                        Forgot your password?
                      </h2>
                      <p className="text-xl text-center">
                        Don’t worry, we got your back!
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        name=""
                        id="email"
                        className="border-gray-400 border-2 rounded-2xl p-3 w-full mt-2"
                        placeholder="Enter your email adress to get link"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
                    >
                      Send
                    </button>
                    <div className="h-16"></div>
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

export default ForgotPass;
