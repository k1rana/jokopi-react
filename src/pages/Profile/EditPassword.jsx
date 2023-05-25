import React, { useState } from 'react';

import { isEqual } from 'lodash';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Modal from '../../components/Modal';
import { updatePassword } from '../../utils/dataProvider/userPanel';

function EditPassword(props) {
  const userInfo = useSelector((state) => state.userInfo);
  const [form, setForm] = useState({
    oldpass: "",
    newpass: "",
    newpassconf: "",
  });
  const [err, setErr] = useState({
    oldpass: "",
    newpass: "",
    newpassconf: "",
  });

  const formHandler = (e) => {
    return setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const error = {
      oldpass: "",
      newpass: "",
      newpassconf: "",
    };
    setErr(error);
    if (form.oldpass.length < 1) {
      error.oldpass = "Required";
    }
    if (form.newpass.length < 1) {
      error.newpass = "Required";
    }
    if (form.newpassconf.length < 1) {
      error.newpassconf = "Required";
    }
    if (form.newpass.length < 8)
      error.newpass = "New password length minimum is 8";
    if (!isEqual(form.newpass, form.newpassconf))
      error.newpassconf = "Password and confirm password does not match";
    setErr(error);

    if (
      error.oldpass === "" &&
      error.newpass === "" &&
      error.newpassconf === ""
    ) {
      e.target.disabled = true;
      toast.promise(
        updatePassword(form.oldpass, form.newpass, userInfo.token).then(
          (res) => {
            return res;
          }
        ),
        {
          loading: "Please wait",
          success: () => {
            e.target.disabled = false;
            props.onClose();
            return "Edit password successful";
          },
          error: (err) => {
            e.target.disabled = false;
            return err.response.data.msg;
          },
        }
      );
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <form onSubmit={submitFormHandler}>
        <div className="mb-6">
          <label
            htmlFor="oldPassword"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldpass"
            className="bg-gray-100 border border-gray-400 text-black text-sm rounded-lg block w-full p-2.5"
            placeholder="Type your old password"
            value={form.oldpass}
            onChange={formHandler}
          />
          <p className="mt-2 text-sm text-red-600">
            <span className="font-medium">{err.oldpass}</span>
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newpass"
            className="bg-gray-100 border border-gray-400 text-black text-sm rounded-lg block w-full p-2.5"
            placeholder="Type new password what you want"
            value={form.newpass}
            onChange={formHandler}
          />
          <p className="mt-2 text-sm text-red-600 ">
            <span className="font-medium">{err.newpass}</span>
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="newPasswordConf"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            New Password Confirmation
          </label>
          <input
            type="password"
            id="newPasswordConf"
            name="newpassconf"
            className="bg-gray-100 border border-gray-400 text-black text-sm rounded-lg block w-full p-2.5"
            placeholder="Type again for confirmation"
            value={form.newpassconf}
            onChange={formHandler}
          />
          <p className="mt-2 text-sm text-red-600 ">
            <span className="font-medium">{err.newpassconf}</span>
          </p>
        </div>
        <section className="flex flex-row gap-x-3 items-center">
          <button
            className="bg-tertiary text-white p-3 rounded-lg text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="submit"
            onClick={submitFormHandler}
          >
            Confirm
          </button>
          <p
            className="hover:underline text-sm cursor-pointer"
            onClick={props.onClose}
          >
            Cancel
          </p>
        </section>
      </form>
    </Modal>
  );
}

export default EditPassword;
