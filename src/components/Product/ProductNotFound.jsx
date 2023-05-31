import React from "react";

import { NavLink } from "react-router-dom";

import lostImage from "../../assets/images/not_found.svg";

function ProductNotFound() {
  return (
    <section className="w-full min-h-[80vh] flex justify-center flex-col gap-10 text-center py-5">
      <img src={lostImage} alt="404" className="h-72" />
      <div className="flex flex-col gap-3">
        <p className="text-xl font-semibold">Product Not Found</p>
        <NavLink to={"/products/"}>
          <button className="rounded-[25px] bg-secondary px-10 text-tertiary font-semibold py-2">
            Back to Products
          </button>
        </NavLink>
      </div>
    </section>
  );
}

export default ProductNotFound;
