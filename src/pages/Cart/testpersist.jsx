import React, { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { uinfoAct } from '../../redux/slices/userInfo.slice';

function Cart() {
  const token = useSelector((state) => state.userInfo);
  const [input, setInput] = useState(token.token);
  const dispatch = useDispatch();
  const handlerAct = (e) => {
    if (e.key === "Enter") {
      dispatch(uinfoAct.assignToken(e.target.value));
    }
  };
  // console.log(jwtDecode(get("jokopi-token")));
  return (
    <>
      <Header />
      {token.token}
      <br />
      <input
        className="border-1 border-gray-500 rounded-lg p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handlerAct}
      />
      <Footer />
    </>
  );
}

export default Cart;
