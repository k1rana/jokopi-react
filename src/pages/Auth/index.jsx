import React from 'react';

import { Outlet } from 'react-router-dom';

import AuthFooter from '../../components/AuthFooter';

const Auth = () => {
  return (
    <>
      <main>
        <div className="flex flex-col lg:flex-row">
          <section className="w-0 min-h-screen lg:w-1/2 lg:block hidden bg-cover bg-center bg-main"></section>
          <section className="lg:w-1/2 bg-main bg-cover bg-center bg-black/70 lg:bg-white lg:bg-none lg:text-black">
            <div className=" px-4 py-7 lg:px-16 flex justify-center flex-col">
              <div className="bg-white px-5 py-6 lg:p-0 rounded-xl min-h-screen">
                <Outlet />
              </div>
            </div>
            <AuthFooter />
          </section>
        </div>
      </main>
    </>
  );
};

export default Auth;
