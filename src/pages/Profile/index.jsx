import React, { useEffect, useMemo, useState } from "react";

import jwtDecode from "jwt-decode";
import { isEqual } from "lodash";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import iconPen from "../../assets/icons/icon-pen.svg";
import loadingImage from "../../assets/images/loading.svg";
import placeholderImage from "../../assets/images/placeholder-profile.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { profileAction } from "../../redux/slices/profile.slice";
import { editProfile } from "../../utils/dataProvider/profile";
import useDocumentTitle from "../../utils/documentTitle";
import EditPassword from "./EditPassword";

function Profile() {
  const userInfo = useSelector((state) => state.userInfo);
  const profile = useSelector((state) => state.profile);

  const uinfo = userInfo.token ? jwtDecode(userInfo.token) : {};
  const [data, setData] = useState({
    address: "",
    birthdate: "",
    created_at: "",
    display_name: "",
    email: "",
    first_name: "",
    gender: 1,
    img: "",
    last_name: "",
    phone_number: "",
    user_id: "",
  });
  const [form, setForm] = useState({
    address: "",
    birthdate: "",
    created_at: "",
    display_name: "",
    email: "",
    first_name: "",
    gender: 1,
    img: "",
    last_name: "",
    phone_number: "",
    user_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editPassModal, setEditPassModal] = useState(false);
  const [isProcess, setProcess] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const controller = useMemo(() => new AbortController(), []);

  const dispatch = useDispatch();

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
    // setIsLoading(true);
    // fetchProfile(userInfo.token)
    //   .then((result) => {
    //     setIsLoading(false);
    //     const data = result.data.data[0];
    //     setData(data);
    //     setForm(data);
    //   })
    //   .catch((err) => {
    //     toast.error("Failed to fetch data");
    //   });
    // console.log(profile.data);
    const updatedObject = { ...profile.data };

    for (const [key, value] of Object.entries(updatedObject)) {
      if (value === null || value === "null") {
        updatedObject[key] = "";
      }
    }
    setData(updatedObject);
    setForm(updatedObject);
  }, [profile]);

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
    setProcess(true);
    if (selectedFile) {
      form.image = selectedFile;
    }
    toast.promise(
      editProfile(form, userInfo.token, controller)
        .then((res) => {
          res.data;
          dispatch(
            profileAction.getProfileThunk({ token: userInfo.token, controller })
          );
        })
        .finally(() => setProcess(false)),
      {
        loading: "Saving changes",
        success: "Changes saved",
        error: "Something went wrong",
      }
    );
  };

  const ActionList = () => (
    <div className="flex flex-col items-center">
      <p className="text-tertiary text-xl mb-4 text-center font-bold">
        Do you want to save the change?
      </p>
      <button
        className="bg-tertiary border-2  secondary py-4 w-[75%] rounded-2xl mb-3 text-white font-semibold text-xl shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"
        id="saveChange"
        onClick={saveHandler}
        disabled={(isEqual(form, data) && !selectedFile) || isProcess}
      >
        Save Change
      </button>
      <button
        className="bg-secondary border-2  secondary py-4 w-[75%] rounded-2xl mb-3 text-tertiary font-semibold text-xl shadow-lg  disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
        onClick={() => setForm({ ...data })}
        disabled={isEqual(form, data) || isProcess}
      >
        Cancel
      </button>
      <button className="mt-10 bg-white border-2  secondary py-4 w-[75%] rounded-2xl mb-8 text-tertiary font-semibold shadow-lg">
        Log out
      </button>
    </div>
  );

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <EditPassword isOpen={editPassModal} onClose={closeEpassModal} />
          <main className="bg-profile">
            <div className="global-px py-10 space-y-3">
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
                    accept="image/png, image/jpeg, image/webp"
                    id="imageUp"
                  />
                  <label
                    htmlFor="imageUp"
                    className="bg-secondary py-3 w-[75%] rounded-2xl mb-3 text-tertiary font-semibold shadow-lg text-center cursor-pointer"
                  >
                    Choose photo
                  </label>
                  <button
                    className="bg-tertiary disabled:bg-gray-400 secondary py-3 w-[75%] rounded-2xl mb-8 text-white font-semibold shadow-lg"
                    onClick={handleClearClick}
                    disabled={selectedFile ? false : true}
                  >
                    Remove photo
                  </button>
                  <button
                    className="bg-white border-2  secondary py-4 w-[75%] rounded-2xl mb-8 text-tertiary font-semibold shadow-lg"
                    onClick={switchEpassModal}
                  >
                    Edit Password
                  </button>
                  <section className="hidden lg:block">
                    <ActionList />
                  </section>
                </section>
                <section className="flex-[2_2_0%] p-4 md:p-10 lg:pl-0">
                  <form className="bg-white drop-shadow-2xl rounded-xl border-b-[6px] border-solid border-[#6a4029] px-5 py-3 relative">
                    <button
                      className={`${
                        editMode ? "bg-secondary" : "bg-tertiary"
                      } absolute top-3 p-2 rounded-full right-3 cursor-pointer select-none`}
                      onClick={(e) => {
                        e.preventDefault();
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
                          disabled={!editMode}
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
                          disabled={!editMode}
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
                          disabled={!editMode}
                        />
                      </div>
                    </div>
                    <p className="text-primary text-xl font-bold">Details</p>
                    <div className="grid lg:grid-cols-[55%_35%] gap-x-5 gap-y-8 py-5">
                      <div className="input-profile">
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
                          disabled={!editMode}
                        />
                      </div>
                      <div className="input-profile">
                        <label htmlFor="email" className="text-[#9f9f9f]">
                          Birthdate
                        </label>
                        <input
                          type="date"
                          value={form.birthdate?.slice(0, 10)}
                          id="birthdate"
                          name="birthdate"
                          disabled={!editMode}
                          onChange={formHandler}
                          className="focus:outline-none border-b-[1px] border-black w-full"
                        />
                      </div>
                      <div className="input-profile">
                        <label htmlFor="email" className="text-[#9f9f9f]">
                          First name
                        </label>
                        <input
                          type="text"
                          value={form.first_name}
                          name="first_name"
                          id="firstName"
                          disabled={!editMode}
                          onChange={formHandler}
                          className="focus:outline-none border-b-[1px] border-black w-full"
                        />
                      </div>
                      <div className="input-profile hidden lg:block"></div>
                      <div className="input-profile">
                        <label htmlFor="email" className="text-[#9f9f9f]">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={form.last_name}
                          name="last_name"
                          id="lastName"
                          disabled={!editMode}
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
                          checked={String(form.gender) === "1"}
                          disabled={!editMode}
                          onChange={formHandler}
                          onClick={() => setForm({ ...form, gender: "1" })}
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
                          checked={String(form.gender) === "2"}
                          disabled={!editMode}
                          onClick={() => setForm({ ...form, gender: "1" })}
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
                <section className="block lg:hidden mt-8">
                  <ActionList />
                </section>
              </section>
            </div>
          </main>
        </>
      )}
      <Footer />
    </>
  );
}
export default Profile;
