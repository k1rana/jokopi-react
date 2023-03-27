/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useParams,
} from 'react-router-dom';

import emptyBox from '../../assets/images/empty.svg';
import loadingImage from '../../assets/images/loading.svg';
import productPlaceholder from '../../assets/images/placeholder-image.webp';
import { getAllProducts } from '../../utils/dataProvider/products';
import withSearchParams from '../../utils/wrappers/withSearchParams.js';

function GetAllProducts(props) {
  {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { catId } = useParams();
    const { searchParams, setSearchParams } = props;

    function getProducts(catId, searchParams, controller) {
      const sort = searchParams.get("sort");
      const orderBy = searchParams.get("orderBy");
      const page = searchParams.get("page");

      setIsLoading(true);
      getAllProducts(catId, { sort, limit: 12, orderBy, page }, controller)
        .then((response) => response.data.data)
        .then((data) => {
          setProducts(data);
          if (!controller.aborted) {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (!controller.aborted) {
            setIsLoading(false);
          }
          setProducts([]);
        });
    }

    // const controller = React.useMemo(() => new AbortController(), [catId]);

    useEffect(() => {
      const controller = new AbortController();

      // Fetch new products
      getProducts(catId, searchParams, controller);
      setIsLoading(true);

      return () => {
        controller.abort();
        setIsLoading(true);
      };
    }, [catId]);

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
      <section className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 justify-items-center content-around gap-3 gap-y-16 mt-10">
        {products.map((product) => (
          <Link to={`/products/detail/${product.id}`} key={product.id}>
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

export default withSearchParams(GetAllProducts);
