import React from 'react';

import { NavLink } from 'react-router-dom';

import notfoundImage from '../../assets/images/empty-box.svg';

export default function NotFound() {
  return (
    <main className="h-[80vh] flex flex-col items-center justify-center">
      <img src={notfoundImage} alt="Not Found" className="w-72" />
      <p>Page Not Found</p>
      <NavLink to="/" className="mt-5 p-3 bg-tertiary text-white rounded-lg">
        Back to Home
      </NavLink>
    </main>
  );
}
