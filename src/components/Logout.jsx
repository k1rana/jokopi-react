import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { contextAct } from "../redux/slices/context.slice";
import { profileAction } from "../redux/slices/profile.slice";
import { uinfoAct } from "../redux/slices/userInfo.slice";
import { logoutUser } from "../utils/dataProvider/auth";
import Modal from "./Modal";

function Logout() {
  const context = useSelector((state) => state.context);
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    if (isLoading) return;
    setLoading(true);
    logoutUser(userInfo.token)
      .then((result) => {
        dispatch(uinfoAct.dismissToken());
        dispatch(contextAct.closeLogout());
        profileAction.reset();
        toast.success("See ya, coffeeholic!");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error ocurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onClose = () => {
    if (isLoading) return;
    dispatch(contextAct.closeLogout());
  };
  return (
    userInfo.token && (
      <Modal isOpen={context.logout} onClose={onClose}>
        <p className="mb-4">Are you sure you want to logout?</p>
        <section className="flex flex-row gap-2">
          <button
            onClick={logoutHandler}
            className={`${
              isLoading && "loading"
            } btn px-5 btn-primary text-white`}
          >
            Yes
          </button>
          <button
            className="btn px-5 bg-white hover:bg-gray-200 border-0 "
            onClick={onClose}
          >
            No
          </button>
        </section>
      </Modal>
    )
  );
}

export default Logout;
