import React, { useEffect, useMemo, useState } from "react";

import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import { createProductEntry } from "../../utils/dataProvider/products";
import useDocumentTitle from "../../utils/documentTitle";

export const NewProduct = (props) => {
  useDocumentTitle("New Product");
  const initialState = {
    name: "",
    price: "",
    category_id: "",
    desc: "",
    image: "",
  };
  const [form, setForm] = useState({
    name: "",
    price: "",
    category_id: "",
    desc: "",
    image: "",
  });
  const [error, setError] = useState({
    name: "",
    price: "",
    category_id: "",
    desc: "",
  });
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [cancel, setCancel] = useState(false);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!form.image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(form.image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.image]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setForm({ ...form, image: "" });
      return;
    }

    if (e.target.files[0].size > 2097152) {
      return toast.error("Files must not exceed 2 MB");
    }

    // I've kept this example simple by using the first image instead of multiple
    setForm({ ...form, image: e.target.files[0] });
  };

  const [isLoading, setLoading] = useState("");
  const controller = useMemo(() => new AbortController(), []);
  const formChangeHandler = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      form.category_id === "" ||
      form.desc === "" ||
      form.name === "" ||
      form.price === ""
    ) {
      return toast.error("Input required form");
    }

    setLoading(true);
    createProductEntry(form, props.userInfo.token, controller)
      .then((result) => {
        console.log(result.data);
        navigate(`/products/detail/${result.data.data[0].id}`, {
          replace: true,
        });
        toast.success("Product added successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Modal isOpen={cancel} onClose={() => setCancel(!cancel)}>
        <p>Are you sure want to reset the form?</p>
        <section className="flex justify-center gap-x-5 mt-5">
          <button
            className="btn btn-error"
            onClick={() => {
              setForm({ ...initialState });
              setCancel(false);
            }}
          >
            Yes
          </button>
          <button className="btn" onClick={() => setCancel(!cancel)}>
            No
          </button>
        </section>
      </Modal>
      <Header />
      <main className="global-px py-6">
        <nav className="flex flex-row list-none gap-1">
          <li className="after:content-['>'] after:font-semibold text-primary">
            <NavLink to="/products">Favorite & Promo </NavLink>
          </li>
          <li className="text-tertiary font-semibold">Add new product</li>
        </nav>
        <section className="flex flex-col md:flex-row py-14">
          <section className="flex-1 flex flex-col items-center gap-4">
            <div className="avatar">
              <div className="w-52 rounded-full">
                <img src={preview || productPlaceholder} />
              </div>
            </div>
            <label
              htmlFor="form_image"
              className="btn btn-block btn-lg normal-case mt-2 btn-accent text-white"
            >
              Take a picture
            </label>
            <label
              htmlFor="form_image"
              className="btn btn-block btn-lg normal-case btn-secondary text-tertiary"
            >
              Choose from gallery
            </label>
          </section>
          <form
            onSubmit={submitHandler}
            className="flex-[2_2_0%] md:pl-12 lg:pl-24 flex flex-col gap-4"
          >
            <input
              id="form_image"
              type="file"
              accept="image/png, image/webp, image/jpeg"
              className="hidden"
              required
              onChange={onSelectFile}
            />
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
              required
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
              placeholder="Describe your product min. 50 characters"
              name="desc"
              id="product_price"
              value={form.desc}
              onChange={formChangeHandler}
              className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
              minLength={50}
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
              onClick={() => setCancel(true)}
              className="btn btn-lg normal-case bg-gray-200 hover:bg-gray-300 border-gray-300 text-tertiary shadow-lg rounded-2xl"
            >
              Reset
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
