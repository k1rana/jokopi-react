import React, { useEffect, useState } from "react";

import jwtDecode from "jwt-decode";
import { isEqual } from "lodash";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import iconPen from "../../assets/icons/icon-pen.svg";
import loadingImage from "../../assets/images/loading.svg";
import placeholderImage from "../../assets/images/placeholder-profile.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchProfile } from "../../utils/dataProvider/userPanel";
import useDocumentTitle from "../../utils/documentTitle";
import EditPassword from "./EditPassword";

function Profile() {
  const userInfo = useSelector((state) => state.userInfo);

  const uinfo = userInfo.token ? jwtDecode(userInfo.token) : {};
  const [data, setData] = useState({});
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editPassModal, setEditPassModal] = useState(false);
  const [modal, setModal] = useState({ photoProfile: false });
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const handleChoosePhoto = () => {
    setIsUploaderOpen(true);
  };

  const closeEpassModal = () => {
    setEditPassModal(false);
  };
  const switchEpassModal = () => {
    setEditPassModal(!editPassModal);
  };

  useDocumentTitle("Profile");
  useEffect(() => {
    setIsLoading(true);
    fetchProfile(userInfo.token)
      .then((result) => {
        setIsLoading(false);
        const data = result.data.data[0];
        setData(data);
        setForm(data);
      })
      .catch((err) => {
        toast.error("Failed to fetch data");
      });
  }, [userInfo]);

  const formHandler = (e) => {
    if (editMode) {
      return setForm((form) => {
        return {
          ...form,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const Loading = (props) => {
    return (
      <main className="h-[80vh] flex items-center justify-center">
        <div>
          <img src={loadingImage} alt="Loading..." />
        </div>
      </main>
    );
  };

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleClearClick = () => {
    setSelectedFile(null);
  };

  const saveHandler = () => {
    let changes = {};

    for (let key in form) {
      if (form[key] !== data[key]) {
        changes[key] = form[key];
      }
    }
    toast.promise(
      updateProfile(data, userInfo.token).then((res) => res.data),
      {
        loading: "Saving changes",
        success: "Changes saved",
        error: "Something went wrong",
      }
    );
  };

  const Profile = (props) => {
    return (
      <>
        <EditPassword isOpen={editPassModal} onClose={closeEpassModal} />
        <main className="bg-profile px-10 lg:px-22 py-10 space-y-3">
          <section className="text-white text-2xl font-extrabold">
            User Profile
          </section>
          <section className="flex flex-col lg:flex-row bg-white rounded-2xl">
            <section className="flex-1 flex flex-col items-center p-10">
              <img
                src={
                  selectedFile
                    ? preview
                    : data.img
                    ? data.img
                    : placeholderImage
                }
                alt=""
                className="w-44 aspect-square object-cover rounded-full mb-3"
              />
              <p className="font-semibold text-lg">{data.display_name}</p>
              <p className="mb-5">{data.email}</p>
              <input
                className="hidden"
                type="file"
                onChange={onSelectFile}
                accept="image/*"
                id="imageUp"
              />
              <label
                htmlFor="imageUp"
                className="bg-secondary py-3 w-[75%] rounded-2xl mb-3 text-tertiary font-semibold shadow-lg text-center cursor-pointer"
              >
                Choose photo
              </label>
              <button
                className="bg-tertiary secondary py-3 w-[75%] rounded-2xl mb-8 text-white font-semibold shadow-lg"
                onClick={handleClearClick}
              >
                Remove photo
              </button>
              <button
                className="bg-white border-2  secondary py-4 w-[75%] rounded-2xl mb-8 text-tertiary font-semibold shadow-lg"
                onClick={switchEpassModal}
              >
                Edit Password
              </button>
              <p className="text-tertiary text-xl mb-4 text-center font-bold">
                Do you want to save the change?
              </p>
              <button
                className="bg-tertiary border-2  secondary py-4 w-[75%] rounded-2xl mb-3 text-white font-semibold text-xl shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"
                id="saveChange"
                onClick={saveHandler}
                disabled={isEqual(form, data)}
              >
                Save Change
              </button>
              <button
                className="bg-secondary border-2  secondary py-4 w-[75%] rounded-2xl mb-3 text-tertiary font-semibold text-xl shadow-lg  disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
                onClick={() => setForm({ ...data })}
                disabled={isEqual(form, data)}
              >
                Cancel
              </button>
              <button className="mt-10 bg-white border-2  secondary py-4 w-[75%] rounded-2xl mb-8 text-tertiary font-semibold shadow-lg">
                Log out
              </button>
            </section>
            <section className="flex-[2_2_0%] p-10 lg:pl-0">
              <form className="bg-white drop-shadow-2xl rounded-xl border-b-[6px] border-solid border-[#6a4029] px-5 py-3 relative">
                <button
                  className="absolute top-3 bg-tertiary p-2 rounded-full right-3 cursor-pointer select-none"
                  onClick={() => {
                    setForm(data);
                    return setEditMode(!editMode);
                  }}
                >
                  <img src={iconPen} alt="" />
                </button>
                <p className="text-primary text-xl font-bold">Contacts</p>
                <div className="grid lg:grid-cols-[55%_35%] gap-x-5 gap-y-8 py-5">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[#9f9f9f]">
                      Email Address
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={form.email}
                      className="focus:outline-none border-b-[1px] border-black w-full"
                      onChange={formHandler}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[#9f9f9f]">
                      Mobile number
                    </label>
                    <input
                      type="text"
                      value={form.phone_number}
                      id="phone"
                      name="phone_number"
                      onChange={formHandler}
                      className="focus:outline-none border-b-[1px] border-black w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[#9f9f9f]">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      id="address"
                      name="address"
                      onChange={formHandler}
                      className="focus:outline-none border-b-[1px] border-black w-full"
                    />
                  </div>
                </div>
                <p className="text-primary text-xl font-bold">Details</p>
                <div className="grid lg:grid-cols-[55%_35%] gap-x-5 gap-y-8 py-5">
                  <div className="input">
                    <label htmlFor="email" className="text-[#9f9f9f]">
                      Display name
                    </label>
                    <input
                      type="text"
                      value={form.display_name}
                      id="display_name"
                      name="display_name"
                      onChange={formHandler}
                      className="focus:outline-none border-b-[1px] border-black w-full"
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="email" className="text-[#9f9f9f]">
                      Birthdate
                    </label>
                    <input
                      type="date"
                      value={form.birdate}
                      id="birthdate"
                      name="birthdate"
                      onChange={formHandler}
                      className="focus:outline-none border-b-[1px] border-black w-full"
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="email" className="text-[#9f9f9f]">
                      First name
                    </label>
                    <input
                      type="text"
                      value={form.first_name}
                      name="first_name"
                      id="firstName"
                      onChange={formHandler}
                      className="focus:outline-none border-b-[1px] border-black w-full"
                    />
                  </div>
                  <div className="input"></div>
                  <div className="input">
                    <label htmlFor="email" className="text-[#9f9f9f]">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={form.last_name}
                      name="last_name"
                      id="lastName"
                      onChange={formHandler}
                      className="focus:outline-none border-b-[1px] border-black w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-around items-center">
                  <div className="male flex items-center gap-2">
                    <input
                      type="radio"
                      id="genderMale"
                      name="gender"
                      value="1"
                      className="hidden peer"
                      checked={form.gender === "1"}
                      onChange={formHandler}
                      required
                    />
                    <label
                      htmlFor="genderMale"
                      className="inline-flex items-center justify-between p-2 text-gray-500 bg-[#BABABA59] rounded-full cursor-pointer peer-checked:text-white peer-checked:bg-secondary peer-checked:font-bold hover:text-gray-600 hover:bg-gray-100 w-2 h-2 border-2 border-tertiary"
                    >
                      <div className="block"></div>
                    </label>
                    <label htmlFor="genderMale">Male</label>
                  </div>
                  <div className="female flex items-center gap-2">
                    <input
                      type="radio"
                      id="genderFemale"
                      name="gender"
                      value="2"
                      className="hidden peer"
                      checked={form.gender === "2"}
                      onChange={formHandler}
                      required
                    />
                    <label
                      htmlFor="genderFemale"
                      className="inline-flex items-center justify-between p-2 text-gray-500 bg-[#BABABA59] rounded-full cursor-pointer peer-checked:text-white peer-checked:bg-secondary peer-checked:font-bold hover:text-gray-600 hover:bg-gray-100 w-2 h-2 border-2 border-tertiary"
                    >
                      <div className="block"></div>
                    </label>
                    <label htmlFor="genderFemale">Female</label>
                  </div>
                </div>
              </form>
            </section>
          </section>
        </main>
      </>
    );
  };

  return (
    <>
      <Header />
      {isLoading ? <Loading /> : <Profile />}
      <Footer />
    </>
  );
}
export default Profile;
