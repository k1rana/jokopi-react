import React, { useCallback, useEffect, useMemo, useState } from "react";

import _ from "lodash";
import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";

import closeIcon from "../../assets/icons/close.svg";
import loadingImage from "../../assets/images/loading.svg";
import productPlaceholder from "../../assets/images/placeholder-promo.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import DeletePromo from "../../components/Promo/DeletePromo";
import PromoNotFound from "../../components/Promo/PromoNotFound";
import { getAllProducts } from "../../utils/dataProvider/products";
import { editPromoEntry, getPromoById } from "../../utils/dataProvider/promo";
import useDocumentTitle from "../../utils/documentTitle";
import { n_f } from "../../utils/helpers";

const EditPromo = (props) => {
  const { promoId } = useParams();
  useDocumentTitle("Edit Promo");
  const initialState = {
    name: "",
    price: "",
    category_id: "",
    desc: "",
    image: "",
  };
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    id: "",
    category_name: "",
  });
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState({ img: "" });
  const [form, setForm] = useState({
    search_product: "",
    product_id: "",
    name: "",
    discount: "1",
    desc: "",
    image: "",
    coupon_code: "",
    start_date: "", // real form
    end_date: "", // real form
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState({
    name: "",
    price: "",
    category_id: "",
    desc: "",
  });
  const [resultSearch, setResultSearch] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [cancel, setCancel] = useState(false);
  const [loadings, setLoadings] = useState({
    search: false,
    data: false,
  });

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

  const searchHandler = useCallback(
    _.debounce((search) => {
      setLoadings({ ...loadings, search: true });
      getAllProducts("", { searchByName: search }, controller)
        .then((result) => setResultSearch(result.data.data))
        .catch((err) => {
          console.log(err);
          setResultSearch([]);
        })
        .finally(() => setLoadings({ ...loadings, search: false }));
    }, 1500),
    []
  );

  useEffect(() => {
    if (form.product_id === "") {
      searchHandler(form.search_product);
    }
  }, [form.search_product, form.product_id]);

  useEffect(() => {
    setLoadings({ ...loadings, data: true });
    getPromoById(promoId, controller)
      .then((result) => {
        const {
          product_name,
          product_id,
          product_price,
          start_date,
          end_date,
        } = result.data.data[0];
        // console.log(result.data.data[0]);
        setForm({
          ...form,
          ...result.data.data[0],
          startDate: start_date,
          endDate: end_date,
        });
        setSelectedProduct({
          id: product_id,
          name: product_name,
          price: product_price,
        });
        setData({ ...data, img: result.data.data[0].img });
        setLoadings({ ...loadings, data: false });
      })
      .catch((err) => {
        setLoadings({ ...loadings, data: false });
        setNotFound(true);
        console.log(err);
      })
      .finally(() => {
        // setLoadings({ ...loadings, data: false });
      });
  }, []);

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
    if (form.product_id === "") return toast.error("Select product required");
    if (
      form.coupon_code === "" ||
      form.desc === "" ||
      form.name === "" ||
      form.discount === "" ||
      form.startDate === "" ||
      form.endDate === ""
    ) {
      return toast.error("Input required form");
    }
    if (form.name.length < 6) return toast.error("Promo title min 6 char");
    if (form.desc.length < 10)
      return toast.error("Promo description min 10 char");
    if (form.coupon_code.length < 6)
      return toast.error("Promo coupon code min 6 char");
    if (form.discount < 1 || form.discount > 100)
      return toast.error("Promo discount is invalid");

    setLoading(true);
    editPromoEntry(promoId, form, props.userInfo.token, controller)
      .then((result) => {
        navigate(`/products/`, {
          replace: true,
        });
        toast.success("Promo edited successfully");
      })
      .catch((err) => {
        if (err.response?.data?.msg) {
          toast.error(err.response?.data?.msg);
          return;
        }
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const setPromoProducts = (index) => {
    setSelectedProduct({ ...selectedProduct, ...resultSearch[index] });
    setForm({ ...form, product_id: resultSearch[index].id });
    setResultSearch([]);
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
      <DeletePromo
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        promoId={promoId}
      />
      <Header />
      {loadings.data ? (
        <Loading />
      ) : notFound ? (
        <PromoNotFound />
      ) : (
        <main className="global-px py-6">
          <nav className="flex flex-row list-none gap-1">
            <li className="after:content-['>'] after:font-semibold text-primary">
              <NavLink to="/products">Favorite & Promo </NavLink>
            </li>
            <li className="text-tertiary font-semibold">Edit promo</li>
          </nav>
          <section className="flex flex-col md:flex-row py-14">
            <section className="flex-1 flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="w-52 rounded-full border">
                  <img
                    src={preview || data.img || productPlaceholder}
                    className="object-contain"
                  />
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
                onChange={onSelectFile}
              />
              <label
                className="text-tertiary font-bold text-lg"
                htmlFor="product_name"
              >
                Product :
              </label>
              <div className="relative flex flex-col">
                {form.product_id ? (
                  <input
                    value={`ID: ${selectedProduct.id} - ${selectedProduct.name}`}
                    disabled
                    className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none disabled:bg-gray-100"
                  />
                ) : (
                  <input
                    placeholder="Search product by name"
                    name="search_product"
                    id="search_product"
                    value={form.search_product}
                    onChange={formChangeHandler}
                    maxLength={50}
                    className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
                  />
                )}
                <div className="absolute right-3 top-3">
                  {form.product_id ? (
                    <button
                      onClick={() => {
                        setForm({ ...form, product_id: "" });
                        setSelectedProduct({});
                      }}
                    >
                      <img src={closeIcon} width={18} />
                    </button>
                  ) : loadings.search ? (
                    <button>
                      <img src={loadingImage} width={18} />
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {resultSearch.length > 0 && form.product_id === "" && (
                <div className="h-24 overflow-y-scroll flex flex-col rounded-lg border px-1">
                  {resultSearch.map((item, key) => (
                    <li
                      onClick={() => setPromoProducts(key)}
                      className="cursor-pointer bg-gray-50 hover:bg-gray-300 rounded-md p-1 text-sm font-medium"
                      key={key}
                    >
                      ID: {item.id} - {item.name} - Price: IDR {n_f(item.price)}{" "}
                      - Category: {item.category_name}
                    </li>
                  ))}
                </div>
              )}
              <label
                className="text-tertiary font-bold text-lg"
                htmlFor="product_name"
              >
                Title :
              </label>
              <input
                placeholder="Type promo title max. 50 characters"
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
                Discount :
              </label>
              <div className="flex gap-5 items-center">
                <input
                  type="range"
                  min={1}
                  max="100"
                  value={form.discount}
                  name="discount"
                  onChange={formChangeHandler}
                  className="range range-xs range-primary"
                />
                <p>{form.discount}%</p>
              </div>
              <div className="flex items-center gap-4 justify-between">
                <input
                  placeholder="Type promo title max. 50 characters"
                  name="name"
                  id="product_name"
                  value={n_f(selectedProduct.price) || 0}
                  maxLength={50}
                  required
                  disabled
                  className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
                />{" "}
                <div>
                  <svg
                    width="18px"
                    height="18px"
                    viewBox="0 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-420.000000, -6559.000000)"
                        fill="#000000"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M375.127681,6399.29274 C374.737008,6398.90242 374.104537,6398.90242 373.714864,6399.29274 C373.324191,6399.68307 373.324191,6400.31497 373.714864,6400.7043 L380.149475,6407.14215 C380.464211,6407.45661 380.241398,6408.00167 379.79677,6408.00167 L365.016149,6408.00167 C364.464611,6408.00167 364,6408.44091 364,6408.99195 L364,6408.99594 C364,6409.54699 364.464611,6409.99821 365.016149,6409.99821 L379.79677,6409.99821 C380.241398,6409.99821 380.464211,6410.52829 380.149475,6410.84275 L373.68389,6417.29957 C373.293217,6417.68889 373.293217,6418.3188 373.68389,6418.70913 L373.68389,6418.70813 C374.073563,6419.09746 374.706034,6419.09746 375.096707,6418.70713 L383.41474,6410.39652 L383.41474,6410.39652 C384.195087,6409.61687 384.195087,6408.35206 383.41474,6407.57241 C383.233892,6407.39272 374.946832,6399.11206 375.127681,6399.29274"
                            id="arrow_right-[#363]"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <input
                  placeholder="Type promo title max. 50 characters"
                  name="name"
                  id="product_name"
                  value={
                    n_f(
                      Math.ceil(
                        selectedProduct.price -
                          selectedProduct.price * (form.discount / 100)
                      )
                    ) || 0
                  }
                  maxLength={50}
                  required
                  disabled
                  className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
                />
              </div>

              <label
                className="text-tertiary font-bold text-lg"
                htmlFor="product_desc"
              >
                Description :
              </label>
              <textarea
                placeholder="Describe your promo min. 10 characters"
                name="desc"
                id="product_price"
                value={form.desc}
                onChange={formChangeHandler}
                className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
                minLength={10}
                maxLength={50}
                required
              >
                {form.desc}
              </textarea>

              {/* couponcode */}
              <label
                className="text-tertiary font-bold text-lg"
                htmlFor="coupon_code"
              >
                Coupon Code :
              </label>
              <input
                placeholder="Type promo coupon code 6-12 characters"
                name="coupon_code"
                id="coupon_code"
                value={form.coupon_code.toUpperCase()}
                onChange={formChangeHandler}
                maxLength={12}
                required
                className="border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none"
              ></input>

              {/* valid promo date */}
              <label
                className="text-tertiary font-bold text-lg"
                htmlFor="coupon_code"
              >
                Promo date (Start - End) :
              </label>
              <Datepicker
                // containerClassName={"bg-white"}
                inputClassName={
                  "bg-white border-b-2 py-2 border-gray-300 focus:border-tertiary outline-none w-full"
                }
                minDate={new Date()}
                value={form}
                popoverDirection="up"
                separator="until"
                onChange={(e) =>
                  setForm({
                    ...form,
                    startDate: e.startDate,
                    endDate: e.startDate,
                    start_date: e.startDate,
                    end_date: e.endDate,
                  })
                }
              />

              <button
                type="submit"
                className={`${
                  isLoading && "loading"
                } btn btn-block btn-lg normal-case mt-2 btn-primary text-white shadow-lg rounded-2xl`}
              >
                Save Promo
              </button>
              {/* <button
              type="reset"
              onClick={() => setCancel(true)}
              className="btn btn-lg normal-case bg-gray-200 hover:bg-gray-300 border-gray-300 text-tertiary shadow-lg rounded-2xl"
            >
              Reset
            </button> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPromo);
