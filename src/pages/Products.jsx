import React from "react";

import { Link, NavLink } from "react-router-dom";

import images from "../assets/images/person-with-a-coffee.webp";
import productPlaceholder from "../assets/images/placeholder-image.webp";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useDocumentTitle from "../utils/documentTitle";

const promos = [
  {
    name: "Lorem ipsum",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Lorem ipsum",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    name: "Lorem ipsum",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Lorem ipsum",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

const products = [
  { name: "Veggie Tomato Mix", price: 30000 },
  { name: "Hazelnut Latter", price: 30000 },
  { name: "Summer Fried Rice", price: 30000 },
  { name: "Veggie Tomato Mix", price: 30000 },
  { name: "Veggie Tomato Mix", price: 30000 },
  { name: "Veggie Tomato Mix", price: 30000 },
  { name: "Veggie Tomato Mix", price: 30000 },
  { name: "Veggie Tomato Mix", price: 30000 },
  { name: "Veggie Tomato Mix", price: 30000 },
  { name: "Veggie Tomato Mix", price: 30000 },
  { name: "Veggie Tomato Mix", price: 30000 },
  { name: "Veggie Tomato Mix", price: 30000 },
];

function Products(props) {
  useDocumentTitle(props.title);
  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row px-10 lg:px-22">
        <section className="flex-1 flex flex-col items-center gap-5 py-5 md:border-r-2 border-solid md:pr-6">
          <h2 className="font-bold text-2xl">Promo Today</h2>
          <p className="text-center">
            Coupons will be updated every weeks.
            <br />
            Check them out!
          </p>
          <div className="flex flex-col justify-center gap-5">
            {promos.map((promo, idx) => (
              <div
                className="flex flex-row items-center bg-slate-300  rounded-xl gap-2 px-4 py-3"
                key={idx}
              >
                <div className="flex-1 flex justify-center">
                  <img src={images} alt="" width="75px" />
                </div>
                <div className="flex-[2_2_0%]">
                  <p className="font-bold">{promo.name}</p>
                  <p className="text-sm">{promo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex-[2_2_0%] flex flex-col md:pl-16 py-5">
          <nav className="list-none flex flex-row md:justify-between justify-evenly flex-wrap gap-5 mb-10">
            <li>
              <NavLink className="border-b-2 border-tertiary pb-1 font-semibold text-tertiary">
                Favorite & Promo
              </NavLink>
            </li>
            <li>
              <NavLink>Coffee</NavLink>
            </li>
            <li>
              <NavLink>Non Coffee</NavLink>
            </li>
            <li>
              <NavLink>Foods</NavLink>
            </li>
            <li>
              <NavLink>Add-on</NavLink>
            </li>
          </nav>
          <section className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 justify-items-center content-around gap-3 gap-y-16 mt-10">
            {products.map((product, idx) => (
              <Link to={`/products/detail/${idx}`} key={idx}>
                <section className="relative w-36 bg-white shadow-xl p-5 rounded-3xl">
                  <img
                    src={product.img ?? productPlaceholder}
                    alt=""
                    className="aspect-square rounded-full object-cover mt-[-50%] w-full mb-3 shadow-lg"
                  />
                  <div className="absolute top-0 right-0 bg-white p-2 rounded-3xl font-extrabold text-lg">
                    20%
                  </div>
                  <div className="flex flex-col gap-5 content-between text-center">
                    <p className="font-black text-lg min-h-[102px]">
                      {product.name}
                    </p>
                    <p className="font-bold end text-tertiary">
                      IDR
                      {product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                  </div>
                </section>
              </Link>
            ))}
          </section>
          <section className="my-6 text-tertiary">
            *the price has been cutted by discount appears
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Products;
