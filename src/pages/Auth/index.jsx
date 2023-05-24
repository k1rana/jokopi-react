import React from 'react';

import { Outlet } from 'react-router-dom';

import AuthFooter from '../../components/AuthFooter';

const Auth = () => {
  return (
    <>
      <main>
        <div className="flex flex-col lg:flex-row">
          <section className="w-0 min-h-screen lg:w-1/2 lg:block hidden bg-cover bg-center bg-main">
            <div className="fixed w-1/2 bg-cover bg-center bg-main z-10 h-screen"></div>
          </section>
          <section className="lg:w-1/2 bg-main bg-cover bg-center bg-black/70 lg:bg-white lg:bg-none lg:text-black">
            <div className="global-px py-7 lg:px-16 flex justify-start md:justify-center flex-col min-h-screen">
              <div className="bg-white px-5 py-6 lg:p-0 rounded-xl md:min-h-screen">
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
