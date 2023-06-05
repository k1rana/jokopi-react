/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import penIcon from "../../assets/icons/icon-pen.svg";
import emptyBox from "../../assets/images/empty.svg";
import loadingImage from "../../assets/images/loading.svg";
import productPlaceholder from "../../assets/images/placeholder-image.webp";
import { getAllProducts } from "../../utils/dataProvider/products";
import { n_f } from "../../utils/helpers";
import withSearchParams from "../../utils/wrappers/withSearchParams.js";

function GetAllProducts(props) {
  {
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [inputPage, setInputPage] = useState(1);
    const userInfo = useSelector((state) => state.userInfo);
    const { catId } = useParams();
    const { searchParams, setSearchParams } = props;
    const { sort, setSort } = props;

    function getProducts(catId, searchParams, controller) {
      const sort = searchParams.get("sort");
      const orderBy = searchParams.get("orderBy");
      const searchByName = searchParams.get("q");
      setIsLoading(true);

      getAllProducts(
        catId,
        { sort, limit: 8, searchByName, orderBy, page },
        controller
      )
        .then((response) => response.data)
        .then((data) => {
          setProducts(data.data);
          setMeta(data.meta);
          setIsLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
          setIsLoading(false);
          setProducts([]);
          setMeta({});
        });
    }

    // const controller = React.useMemo(() => new AbortController(), [catId]);
    const page = searchParams.get("page");
    if (searchParams.has("page") && (page < 1 || isNaN(page))) {
      setSearchParams({ page: 1 });
    }

    const paginatorPress = (e) => {
      if (e.key === "Enter") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const page =
          meta.totalPage < e.target.value ? meta.totalPage : e.target.value;
        setSearchParams({ page });
      }
    };

    // const controller = useMemo(
    //   () => new AbortController(),
    //   [catId, page, searchParams]
    // );

    const navigate = useNavigate();
    const location = useLocation();

    const navigateWithParams = (newParams) => {
      const searchParams = new URLSearchParams(location.search);
      Object.entries(newParams).forEach(([key, value]) =>
        searchParams.set(key, value)
      );
      navigate(`${location.pathname}?${searchParams}`);
    };

    const handleNextClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigateWithParams({ page: parseInt(meta.currentPage) + 1 });
    };

    const handlePrevClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigateWithParams({ page: parseInt(meta.currentPage) - 1 });
    };

    useEffect(() => {
      const controller = new AbortController();
      setInputPage(!page ? 1 : page);

      // Fetch new products
      getProducts(catId, searchParams, controller);

      return () => {
        console.log(catId);
        controller.abort();
        setIsLoading(true);
      };
    }, [catId, page, searchParams]);

    if (isLoading)
      return (
        <section className="w-full h-80 flex justify-center items-center">
          <img src={loadingImage} alt="" />
        </section>
      );

    if (products.length < 1) {
      return (
        <section className="w-full flex flex-col justify-center items-center py-8 text-center font-medium gap-5">
          <div>
            <img src={emptyBox} alt="" className="w-52" />
          </div>
          <div>
            <p>
              We&apos;re sorry, it seems our products have gone into hiding.
            </p>
            <p>We&apos;ll try to coax them out soon.</p>
          </div>
        </section>
      );
    }

    return (
      <>
        <section className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 justify-items-center content-around gap-3 gap-y-16 mt-10">
          {products.map((product) => (
            <Link to={`/products/detail/${product.id}`} key={product.id}>
              <section className="relative w-36 bg-white shadow-lg hover:shadow-xl duration-200 p-5 rounded-3xl">
                <img
                  src={product.img ?? productPlaceholder}
                  alt=""
                  className="aspect-square rounded-full object-cover mt-[-50%] w-full mb-3 shadow-lg"
                />
                {/* <div className="absolute top-0 right-0 bg-white p-2 rounded-3xl font-extrabold text-lg">
                20%
              </div> */}
                <div className="flex flex-col gap-5 content-between text-center">
                  <p className="font-black text-lg min-h-[102px]">
                    {product.name}
                  </p>
                  <p className="font-bold end text-tertiary">
                    IDR {n_f(product.price)}
                  </p>
                  {Number(userInfo.role) > 1 && (
                    <NavLink
                      to={`/products/edit/${product.id}`}
                      className="bg-tertiary absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center hover:bg-primary-focus"
                    >
                      <img src={penIcon} className="w-4 h-4" />
                    </NavLink>
                  )}
                </div>
              </section>
            </Link>
          ))}
        </section>
        <section className="flex items-center justify-center mt-12 relative">
          <ul
            className="pagination flex justify-center sm:justify-start lg:justify-center items-center p-0 w-full"
            role="navigation"
          >
            {meta.prev ? (
              <li>
                <button
                  className="group border border-secondary bg-white hover:bg-secondary-200 text-secondary hover:text-tertiary rounded-lg font-bold py-2 px-4 mx-1 flex items-center lg:py-3 lg:px-4 duration-200"
                  rel="prev"
                  onClick={handlePrevClick}
                >
                  <svg
                    className="fill-current h-5 w-5 sm:mr-2 transform rotate-180 transition-transform ease-in group-hover:transform group-hover:-translate-x-0.5"
                    viewBox="0 0 16 17"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.63236 9.26808H10.8757L9.1343 11.0095C8.73118 11.4126 8.73118 12.0662 9.1343 12.4693C9.53742 12.8724 10.191 12.8724 10.5941 12.4693L14.0977 8.96571C14.2913 8.77218 14.4001 8.50957 14.4001 8.23582C14.4001 7.96207 14.2913 7.6995 14.0977 7.50589L10.5942 4.00232C10.191 3.59925 9.53746 3.59921 9.13434 4.00232C8.73123 4.40544 8.73123 5.05903 9.13434 5.46214L10.8758 7.20356H2.63236C2.06226 7.20356 1.6001 7.66572 1.6001 8.23582C1.60006 8.80592 2.06226 9.26808 2.63236 9.26808Z"></path>
                  </svg>{" "}
                  <p className="hidden sm:flex">Previous</p>
                </button>
              </li>
            ) : (
              ""
            )}

            {meta.next ? (
              <li>
                <button
                  className="group bg-secondary text-tertiary rounded-lg font-bold py-2 px-4 mx-1 flex items-center hover:bg-secondary-200 lg:py-3 lg:px-4 duration-200"
                  rel="next"
                  onClick={handleNextClick}
                >
                  <p className="flex">Next</p>
                  <svg
                    alt="Next page"
                    className="fill-current h-5 ml-2 transition ease-in group-hover:transform group-hover:translate-x-0.5"
                    viewBox="0 0 16 17"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.63236 9.26808H10.8757L9.1343 11.0095C8.73118 11.4126 8.73118 12.0662 9.1343 12.4693C9.53742 12.8724 10.191 12.8724 10.5941 12.4693L14.0977 8.96571C14.2913 8.77218 14.4001 8.50957 14.4001 8.23582C14.4001 7.96207 14.2913 7.6995 14.0977 7.50589L10.5942 4.00232C10.191 3.59925 9.53746 3.59921 9.13434 4.00232C8.73123 4.40544 8.73123 5.05903 9.13434 5.46214L10.8758 7.20356H2.63236C2.06226 7.20356 1.6001 7.66572 1.6001 8.23582C1.60006 8.80592 2.06226 9.26808 2.63236 9.26808Z"></path>
                  </svg>
                </button>
              </li>
            ) : (
              ""
            )}
          </ul>
          <div className="hidden sm:flex justify-between items-center sm:absolute right-0">
            <span className="text-sm mr-2">Page</span>
            <input
              type="number"
              name="paginator"
              min="1"
              max={meta.totalPage}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onKeyDown={paginatorPress}
              className="w-10 h-6 border border-gray-200 bg-white rounded-sm p-1 text-center appearance-none focus:outline-none focus:ring-1 focus:ring-secondary text-sm"
            />
            <span className="text-sm mx-1.5">of</span>
            <span className="mr-2 text-sm">{meta.totalPage}</span>
            {meta.prev ? (
              <button
                className="w-6 h-6 bg-secondary flex items-center justify-center rounded-l-sm hover:bg-secondary-200 duration-200"
                onClick={handlePrevClick}
              >
                <svg
                  alt="icon previous"
                  className="fill-current h-5 w-5 text-tertiary transform rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                >
                  <defs></defs>
                  <path d="M226.6 397l-92.3 92.3a25 25 0 0035.4 35.4l110-110a25 25 0 000-35.4l-110-110a25 25 0 00-35.4 35.4l92.3 92.3z"></path>
                </svg>
              </button>
            ) : (
              ""
            )}

            {meta.next ? (
              <button
                className="w-6 h-6 bg-secondary flex items-center justify-center rounded-sm hover:bg-secondary-200 -ml-0.5 duration-200"
                onClick={handleNextClick}
              >
                <svg
                  alt="icon next"
                  className="fill-current h-5 w-5 text-tertiary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                >
                  <defs></defs>
                  <path d="M226.6 397l-92.3 92.3a25 25 0 0035.4 35.4l110-110a25 25 0 000-35.4l-110-110a25 25 0 00-35.4 35.4l92.3 92.3z"></path>
                </svg>
              </button>
            ) : (
              ""
            )}
          </div>
        </section>
      </>
    );
  }
}

export default withSearchParams(GetAllProducts);
