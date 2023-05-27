import React, { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";

import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getTransactionHistory } from "../../utils/dataProvider/transaction";
import useDocumentTitle from "../../utils/documentTitle";

function History() {
  const authInfo = useSelector((state) => state.userInfo);
  const controller = useMemo(() => new AbortController(), []);
  const [list, setList] = useState([]);
  useDocumentTitle("History");

  useEffect(() => {
    getTransactionHistory(authInfo.token, controller)
      .then((result) => {
        setList(result.data.data);
      })
      .then(() => {
        setData([]);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="bg-history bg-cover bg-center py-6 md:py-12 lg:py-20 text-white">
        <section className="global-px">
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
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black py-7">
            {list.map((item, key) => (
              <div
                className="history-card  flex flex-row px-4 py-5 bg-white rounded-2xl gap-5 relative"
                key={key}
              >
                <div className="">
                  <img
                    src={
                      item.products[0].product_img
                        ? item.products[0].product_img
                        : productPlaceholder
                    }
                    alt=""
                    width="100px"
                    className="rounded-full  aspect-square object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-extrabold text-xl">
                    {item.products[0].product_name}
                  </h3>
                  <p className="text-tertiary">IDR {item.grand_total}</p>
                  <p className="text-tertiary">{item.status_name}</p>
                </div>
                <input
                  type="checkbox"
                  className="checkbox-history absolute bottom-4 right-4 delete-checkbox border-secondary bg-secondary rounded h-5 w-5"
                />
              </div>
            ))}
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default History;
