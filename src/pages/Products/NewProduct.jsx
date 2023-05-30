import React, { useMemo, useState } from "react";

import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { createProductEntry } from "../../utils/dataProvider/products";

export const NewProduct = (props) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category_id: "",
    desc: "",
  });
  const [isLoading, setLoading] = useState("");
  const controller = useMemo(() => new AbortController(), []);
  const formChangeHandler = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    createProductEntry(form, props.userInfo.token, controller)
      .then(() => {
        toast.success("berhasil");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Header />
      <main className="global-px py-6">
        <nav className="flex flex-row list-none gap-1">
          <li className="after:content-['>'] after:font-semibold text-primary">
            <NavLink to="/products">Favorite & Promo </NavLink>
          </li>
          <li className="text-tertiary font-semibold">Add new product</li>
        </nav>
        <section className="flex flex-row py-14">
          <section className="flex-1 flex flex-col items-center gap-4">
            <div className="avatar">
              <div className="w-52 rounded-full">
                <img src={productPlaceholder} />
              </div>
            </div>
            <button className="btn btn-block btn-lg normal-case mt-2 btn-accent text-white">
              Take a picture
            </button>
            <button className="btn btn-block btn-lg normal-case btn-secondary text-tertiary">
              Choose from gallery
            </button>
          </section>
          <form
            onSubmit={submitHandler}
            className="flex-[2_2_0%] pl-24 flex flex-col gap-4"
          >
            <label
              className="text-tertiary font-bold text-lg"
              htmlFor="product_name"
            >
              Name :
            </label>
            <input
              placeholder="Type product name max. 50 characters"
              name="name"
              id="product_name"
              value={form.name}
              onChange={formChangeHandler}
              maxLength={50}
              className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
            ></input>

            <label
              className="text-tertiary font-bold text-lg"
              htmlFor="product_price"
            >
              Price :
            </label>
            <input
              placeholder="Type the price"
              name="price"
              type="number"
              id="product_price"
              value={form.price}
              onChange={formChangeHandler}
              className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
            />

            <label
              className="text-tertiary font-bold text-lg"
              htmlFor="product_desc"
            >
              Description :
            </label>
            <textarea
              placeholder="Describe your product min. 150 characters"
              name="desc"
              id="product_price"
              value={form.desc}
              onChange={formChangeHandler}
              className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
              maxLength={250}
            >
              {form.desc}
            </textarea>

            <label
              className="text-tertiary font-bold text-lg"
              htmlFor="product_category"
            >
              Category :
            </label>
            <select
              name="category_id"
              id="form_category"
              value={form.category_id}
              onChange={formChangeHandler}
              className="select select-bordered w-full rounded-xl"
            >
              <option disabled value="">
                Select related category
              </option>
              <option value="1">Coffee</option>
              <option value="2">Non-Coffee</option>
              <option value="3">Food</option>
              <option value="4">Add-ons</option>
            </select>
            <button
              type="submit"
              className={`${
                isLoading && "loading"
              } btn btn-block btn-lg normal-case mt-2 btn-primary text-white shadow-lg rounded-2xl`}
            >
              Save Product
            </button>
            <button
              type="reset"
              className="btn btn-lg normal-case bg-gray-200 hover:bg-gray-300 border-gray-300 text-tertiary shadow-lg rounded-2xl"
            >
              Cancel
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
