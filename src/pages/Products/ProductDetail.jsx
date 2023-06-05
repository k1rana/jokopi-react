/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
} from 'react';

import toast from 'react-hot-toast';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  NavLink,
  useNavigate,
  useParams,
} from 'react-router-dom';

import loadingImage from '../../assets/images/loading.svg';
import lostImage from '../../assets/images/not_found.svg';
import productPlaceholder from '../../assets/images/placeholder-image.webp';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { cartActions } from '../../redux/slices/cart.slice';
import { getProductbyId } from '../../utils/dataProvider/products';
import useDocumentTitle from '../../utils/documentTitle';

function ProductDetail(props) {
  const [form, setForm] = useState({
    delivery: 0,
    count: 1,
    now: 0,
    time: "",
    size: 1,
  });
  const [cart, setCart] = useState([]);
  const [detail, setDetail] = useState({
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const cartRedux = useSelector((state) => state.cart);
  const filteredCart = cartRedux.list.filter(
    (obj) => String(obj.product_id) === String(productId)
  );

  const controller = React.useMemo(() => new AbortController(), []);

  useEffect(() => {
    setIsLoading(true);
    getProductbyId(productId, controller)
      .then((response) => {
        setDetail(response.data.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setNotFound(true);
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const NotFound = () => {
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
  };

  const Loading = () => {
    return (
      <section className="min-h-[80vh] flex items-center justify-center flex-col">
        <div>
          <img src={loadingImage} alt="" />
        </div>
      </section>
    );
  };

  function onChangeForm(e) {
    return setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  }

  const countIncrement = () => {
    return setForm((form) => {
      return {
        ...form,
        count: form.count + 1,
      };
    });
  };
  const countDecrement = () => {
    if (form.count > 1) {
      return setForm((form) => {
        return {
          ...form,
          count: form.count - 1,
        };
      });
    }
  };
  const checkoutHandler = () => {
    if (cart.length < 1) {
      return toast.error("Add atleast 1 size to cart");
    }
    navigate("/cart");
    // toast.promise(
    //   addCart(detail.id, cart, userInfo.token).then((res) => {
    //     return res;
    //   }),
    //   {
    //     loading: "Adding to cart...",
    //     success: () => {
    //       navigate("/cart");
    //       return "Succesfully add to cart";
    //     },
    //     error: "Error while adding to cart",
    //   }
    // );
  };

  const handleAddToCart = () => {
    const newItem = {
      size: Number(form.size), // mengubah nilai form.size ke tipe data number
      count: Number(form.count), // mengubah nilai form.count ke tipe data number
    };
    if (newItem.size < 1 || newItem.size > 3) {
      toast.error("Please choose size");
      return;
    }
    if (newItem.count < 1) {
      toast.error("Invalid count");
      return;
    }

    dispatch(
      cartActions.addtoCart({
        product_id: detail.id,
        size_id: newItem.size,
        qty: form.count,
        name: detail.name,
        img: detail.img,
        price: detail.price,
      })
    );

    setCart((prevItems) => {
      const index = prevItems.findIndex((item) => item.size === newItem.size); // cari indeks item dengan size yang sama
      if (index !== -1) {
        const newItems = [...prevItems]; // buat salinan array of objects yang sudah ada
        newItems[index].count += newItem.count; // tambahkan jumlah count pada item yang sudah ada
        return newItems; // kembalikan array of objects yang sudah diubah
      } else {
        return [...prevItems, newItem]; // tambahkan item baru jika tidak ada item dengan size yang sama
      }
    });

    setForm({ size: "", count: 1 }); // reset nilai form setelah berhasil menambahkan item ke cart
  };

  const Detail = (props) => {
    const p = props.data;
    const desc = !p.desc
      ? "This product does not have a description yet."
      : p.desc;
    useDocumentTitle(p.name);
    return (
      <main className="global-px py-10">
        <nav className="flex flex-row list-none gap-1">
          <li className="after:content-['>'] after:font-semibold text-primary">
            <NavLink to="/products">Favorite & Promo </NavLink>
          </li>
          <li className="text-tertiary font-semibold">{p.name}</li>
        </nav>
        <section className="flex my-10 gap-16 flex-col md:flex-row">
          <aside className="flex-1 flex flex-col items-center justify-between gap-10">
            <img
              src={p.img ? p.img : productPlaceholder}
              alt={p.name}
              className="aspect-square object-cover rounded-full w-64"
            />
            <section className="p-4 px-8 w-full shadow-primary rounded-xl flex flex-col gap-8">
              <p className="font-bold text-left text-xl">Delivery and Time</p>
              <div className="select-none">
                <ul className="flex flex-row gap-2 font-bold">
                  <li>
                    <input
                      type="radio"
                      id="dinein"
                      name="delivery"
                      value="1"
                      className="hidden peer"
                      checked={form.delivery === "1"}
                      onChange={onChangeForm}
                      required
                    />
                    <label
                      htmlFor="dinein"
                      className="inline-flex items-center justify-between p-2 text-gray-500 bg-[#BABABA59] rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-tertiary peer-checked:font-bold hover:text-gray-600 hover:bg-gray-100"
                    >
                      <div className="block">Dine in</div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="doordelivery"
                      name="delivery"
                      value="2"
                      className="hidden peer"
                      checked={form.delivery === "2"}
                      onChange={onChangeForm}
                      required
                    />
                    <label
                      htmlFor="doordelivery"
                      className="inline-flex items-center justify-between p-2 text-gray-500 bg-[#BABABA59] rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-tertiary peer-checked:font-bold hover:text-gray-600 hover:bg-gray-100"
                    >
                      <div className="block">Door delivery</div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="pickup"
                      name="delivery"
                      value="3"
                      className="hidden peer"
                      checked={form.delivery === "3"}
                      onChange={onChangeForm}
                      required
                    />
                    <label
                      htmlFor="pickup"
                      className="inline-flex items-center justify-between p-2 text-gray-500 bg-[#BABABA59] rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-tertiary peer-checked:font-bold hover:text-gray-600 hover:bg-gray-100"
                    >
                      <div className="block">Pick up</div>
                    </label>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-[20%_80%] items-center gap-y-8 mb-4">
                <p>Now</p>
                <div className="select-none">
                  <ul className="flex flex-row gap-2 font-bold">
                    <li>
                      <input
                        type="radio"
                        id="now-true"
                        name="now"
                        value="1"
                        checked={form.now === "1"}
                        onChange={onChangeForm}
                        className="hidden peer"
                        required
                      />
                      <label
                        htmlFor="now-true"
                        className="inline-flex items-center justify-between p-2 px-7 text-gray-500 bg-[#BABABA59] rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-tertiary peer-checked:font-bold hover:text-gray-600 hover:bg-gray-100"
                      >
                        <div className="block">Yes</div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="now-false"
                        name="now"
                        value="0"
                        className="hidden peer"
                        checked={form.now === "0"}
                        onChange={onChangeForm}
                        required
                      />
                      <label
                        htmlFor="now-false"
                        className="inline-flex items-center justify-between p-2 px-7 text-gray-500 bg-[#BABABA59] rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-tertiary peer-checked:font-bold hover:text-gray-600 hover:bg-gray-100"
                      >
                        <div className="block">No</div>
                      </label>
                    </li>
                  </ul>
                </div>
                <p>Set time</p>
                <div>
                  <input
                    type="time"
                    name="time"
                    id="reservationtime"
                    value={form.time}
                    onChange={onChangeForm}
                    className="bg-[#BABABA59] py-2 px-8 rounded-lg text-primary font-bold"
                  />
                </div>
              </div>
            </section>
          </aside>
          <aside className="flex-1 flex flex-col gap-5 justify-between">
            <p className="font-black text-5xl uppercase w-full text-center mb-4">
              {p.name}
            </p>
            <p className="text-tertiary text-lg text-justify md:min-h-[200px]">
              {desc}
            </p>
            <p className="text-tertiary text-lg mb-8">
              Delivery only on <b>Monday to friday</b> at <b>1 - 7 pm</b>
            </p>
            <div className="flex justify-between items-center">
              <div className="custom-number-input h-10 w-32">
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1v text-tertiary font-bold">
                  <button
                    onClick={countDecrement}
                    className=" bg-white h-full w-20 rounded-l cursor-pointer outline-none border-gray-400 border-2 border-r-0"
                  >
                    <span className="m-auto text-xl">−</span>
                  </button>
                  <input
                    type="number"
                    className="outline-none focus:outline-none text-center w-full bg-white text-md  md:text-basecursor-default flex items-center border-gray-400 border-2"
                    name="custom-input-number"
                    value={form.count}
                    onChange={onChangeForm}
                    min="1"
                  ></input>
                  <button
                    onClick={countIncrement}
                    className="bg-white h-full w-20 rounded-r cursor-pointer border-gray-400 border-2 border-l-0"
                  >
                    <span className="m-auto text-xl">+</span>
                  </button>
                </div>
              </div>
              <p className="font-bold text-xl">
                IDR {p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
            </div>
            <button
              className="mt-4 block bg-tertiary text-white font-bold text-lg py-4 rounded-xl"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="block bg-secondary disabled:bg-gray-300 disabled:cursor-not-allowed text-tertiary font-bold text-lg py-4 rounded-xl"
              disabled
            >
              Ask a Staff
            </button>
          </aside>
        </section>
        <section className="flex flex-col md:flex-row gap-8">
          <aside className="flex-1 font-bold rounded-xl shadow-primary px-5 py-8 text-center space-y-4 text-xl">
            <p>Choose a size</p>
            <div className="flex justify-center gap-4 list-none">
              <li>
                <input
                  type="radio"
                  id="regular-size"
                  name="size"
                  value="1"
                  className="hidden peer"
                  checked={form.size === "1"}
                  onChange={onChangeForm}
                  required
                />
                <label
                  htmlFor="regular-size"
                  className="inline-block bg-gray-400 rounded-full peer-checked:bg-secondary peer-checked:font-bold cursor-pointer"
                >
                  <p className=" p-2 w-12 h-12 text-center ">R</p>
                </label>
              </li>
              <li>
                {" "}
                <input
                  type="radio"
                  id="large-size"
                  name="size"
                  value="2"
                  className="hidden peer"
                  checked={form.size === "2"}
                  onChange={onChangeForm}
                  required
                />
                <label
                  htmlFor="large-size"
                  className="inline-block bg-gray-400 rounded-full peer-checked:bg-secondary peer-checked:font-bold cursor-pointer"
                >
                  <p className=" p-2 w-12 h-12 text-center ">L</p>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="xlargeSize"
                  name="size"
                  value="3"
                  className="hidden peer"
                  checked={form.size === "3"}
                  onChange={onChangeForm}
                  required
                />
                <label
                  htmlFor="xlargeSize"
                  className="inline-block bg-gray-400 rounded-full peer-checked:bg-secondary peer-checked:font-bold cursor-pointer"
                >
                  <p className="p-2 w-12 h-12 text-center ">XL</p>
                </label>
              </li>
            </div>
          </aside>
          <aside className="flex-[3_3_0] rounded-xl shadow-primary flex items-center px-6 md:px-14 py-8 gap-4 flex-wrap lg:flex-nowrap">
            <div className="">
              <img
                src={productPlaceholder}
                alt=""
                className="h-24 aspect-square object-cover rounded-full"
              />
            </div>
            <div className="flex-[4_4_0] min-w-[100px] space-y-2">
              <p className="font-black uppercase text-xl text-center md:text-left">
                {p.name}
              </p>
              <div
                className={`grid grid-rows-2 gap-2 text-lg grid-auto-rows-16 ${
                  cart.length === 2 ? "grid-flow-row" : "grid-flow-col"
                }`}
              >
                {filteredCart.map((item, idx) => {
                  let sizeName;
                  switch (item.size_id) {
                    case 1:
                      sizeName = "Regular";
                      break;
                    case 2:
                      sizeName = "Large";
                      break;
                    case 3:
                      sizeName = "Xtra Large";
                      break;

                    default:
                      sizeName = "Regular";
                      break;
                  }
                  return (
                    <div
                      className={`${
                        idx % 2 === 0 && cart.length < 2 ? "col-span-2" : ""
                      }`}
                      key={idx}
                    >
                      <p>
                        x{item.qty} ({sizeName})
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 font-bold text-lg w-full content-end md:hidden">
              <p className="text-right">Checkout</p>
            </div>
            <div className="flex-1">
              <button
                className="bg-secondary h-14 aspect-square flex items-center justify-center object-cover rounded-full"
                onClick={checkoutHandler}
              >
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 33 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.4142 16.4142C33.1953 15.6332 33.1953 14.3668 32.4142 13.5858L19.6863 0.857864C18.9052 0.0768156 17.6389 0.0768156 16.8579 0.857864C16.0768 1.63891 16.0768 2.90524 16.8579 3.68629L28.1716 15L16.8579 26.3137C16.0768 27.0948 16.0768 28.3611 16.8579 29.1421C17.6389 29.9232 18.9052 29.9232 19.6863 29.1421L32.4142 16.4142ZM0 17L31 17V13L0 13L0 17Z"
                    fill="#6A4029"
                  />
                </svg>
              </button>
            </div>
          </aside>
        </section>
      </main>
    );
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : notFound ? (
        <NotFound />
      ) : (
        <Detail data={detail} />
      )}
      <Footer />
    </>
  );
}
export default ProductDetail;
