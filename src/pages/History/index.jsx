import React from "react";

import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function History() {
  return (
    <>
      <Header />
      <section className="bg-history bg-cover bg-center px-22 py-24 text-white">
        <div className="flex flex-col items-center p-3">
          <h2 className="text-3xl drop-shadow-[0px_10px_10px_rgba(0,0,0,0.6)] font-extrabold mb-5 text-center">
            Let&#8242;s see what you have bought!
          </h2>
          <p>Select items to delete</p>
        </div>
        <nav className="flex flex-row justify-end gap-4">
          <li className="list-none cursor-pointer select-none" id="selectAll">
            <p className="underline font-bold">Select All</p>
          </li>
          <li
            className="list-none cursor-pointer select-none"
            id="deleteSelected"
          >
            <p className="underline font-bold">Delete</p>
          </li>
        </nav>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black py-7">
          <div className="history-card  flex flex-row px-4 py-5 bg-white rounded-2xl gap-5 relative">
            <div className="">
              <img
                src={productPlaceholder}
                alt=""
                width="100px"
                className="rounded-full  aspect-square object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-extrabold text-xl">Veggie tomato mix 1</h3>
              <p className="text-tertiary">IDR 34.000</p>
              <p className="text-tertiary">Delivered</p>
            </div>
            <input
              type="checkbox"
              className="checkbox-history absolute bottom-4 right-4 delete-checkbox border-secondary bg-secondary rounded h-5 w-5"
            />
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default History;
