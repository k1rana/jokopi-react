import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  Link,
  useParams,
} from 'react-router-dom';

import loadingImage from '../../assets/images/loading.svg';
import productPlaceholder from '../../assets/images/placeholder-image.webp';

export default function GetAllProducts(props) {
  {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { catId } = useParams();
    const [category, setCategory] = useState(catId);

    const controller = new AbortController();

    function getProducts(controller, catId) {
      setIsLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_HOST}/products?category=${catId}`,
          {
            signal: controller.signal,
          }
        )
        .then((response) => response.data.data)
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setProducts([]);
        });
    }

    useEffect(() => {
      getProducts(controller, catId);
    }, [catId]);

    useEffect(() => {
      controller.abort();
    }, []);

    if (isLoading)
      return (
        <section className="w-full h-80 flex justify-center items-center">
          <img src={loadingImage} alt="" />
        </section>
      );

    if (products.length < 1) {
      return <p>Data not found</p>;
    }

    return (
      <section className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 justify-items-center content-around gap-3 gap-y-16 mt-10">
        {products.map((product, idx) => (
          <Link to={`/products/detail/${idx}`} key={idx}>
            <section className="relative w-36 bg-white shadow-xl p-5 rounded-3xl">
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
    );
  }
}
