import React, { useEffect, useState } from "react";

import { isEqual } from "lodash";
import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import DeleteProduct from "../../components/Product/DeleteProduct";
import ProductNotFound from "../../components/Product/ProductNotFound";
import {
  editProductEntry,
  getProductbyId,
} from "../../utils/dataProvider/products";
import useDocumentTitle from "../../utils/documentTitle";

export const EditProduct = (props) => {
  useDocumentTitle("Edit Product");

  /// states
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
  const [data, setData] = useState({
    image: "",
  });
  const [error, setError] = useState({
    name: "",
    price: "",
    category_id: "",
    desc: "",
  });
  const [isLoading, setIsLoading] = useState(true); // load data
  const [loading, setLoading] = useState(false); // process patch

  // react router dom
  const { productId } = useParams();
  const navigate = useNavigate();
  const controller = React.useMemo(() => new AbortController(), []);

  const [preview, setPreview] = useState("");
  const [cancel, setCancel] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    getProductbyId(productId, controller)
      .then((response) => {
        setForm(response.data.data[0]);
        setData({ ...response.data.data[0] });
        setIsLoading(false);
      })
      .catch((error) => {
        setNotFound(true);
        // console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!form.image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(form.image);
    setPreview(objectUrl);

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

  const formChangeHandler = (e) => {
    if (e.target.name === "price" && isNaN(e.target.value)) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    editProductEntry(form, productId, props.userInfo.token, controller)
      .then((result) => {
        // console.log(result.data);
        navigate(`/products/detail/${result.data.data[0].id}`, {
          replace: true,
        });
        toast.success("Product updated successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const resetHandler = () => {
    setForm({ ...data });
    setCancel(false);
  };

  const disabled = isEqual(form, data);
  return (
    <>
      <Modal isOpen={cancel} onClose={() => setCancel(!cancel)}>
        <p>Are you sure want to reset the form?</p>
        <section className="flex justify-center gap-x-5 mt-5">
          <button className="btn btn-error" onClick={resetHandler}>
            Yes
          </button>
          <button className="btn" onClick={() => setCancel(!cancel)}>
            No
          </button>
        </section>
      </Modal>
      <DeleteProduct
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        productId={productId}
      />
      <Header />

      {isLoading ? (
        <Loading />
      ) : notFound ? (
        <ProductNotFound />
      ) : (
        <main className="global-px py-6">
          <nav className="flex flex-row list-none gap-1">
            <li className="after:content-['>'] after:font-semibold text-primary">
              <NavLink to="/products">Favorite & Promo </NavLink>
            </li>
            <li className="text-tertiary font-semibold">Edit product</li>
          </nav>
          <section className="flex flex-col md:flex-row py-14">
            <section className="flex-1 flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="w-52 rounded-full">
                  <img src={preview || form.img || productPlaceholder} />
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
              <button
                onClick={() => setDeleteModal(true)}
                className="btn btn-block btn-error btn-lg normal-case btn-secondary"
              >
                Delete product
              </button>
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
                rows={4}
                value={form.desc}
                onChange={formChangeHandler}
                className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
                minLength={50}
                maxLength={350}
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
                onClick={submitHandler}
                disabled={disabled}
                className={`${loading && "loading"} ${
                  disabled && "btn-disabled"
                } btn btn-block btn-lg normal-case mt-2 btn-primary text-white shadow-lg rounded-2xl disabled:text-gray-400`}
              >
                Save Product
              </button>
              <button
                type="reset"
                onClick={() => setCancel(true)}
                disabled={disabled || loading}
                className={`${
                  (disabled || loading) && "btn-disabled"
                } btn btn-lg normal-case  bg-gray-200 hover:bg-gray-300 border-gray-300 text-tertiary shadow-lg rounded-2xl disabled:text-gray-400`}
              >
                Reset changes
              </button>
            </form>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
