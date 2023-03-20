import React from "react";

import iconPen from "../assets/icons/icon-pen.svg";
import placeholderImage from "../assets/images/placeholder-profile.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useDocumentTitle from "../utils/documentTitle";

function Profile() {
  useDocumentTitle("Profile");
  return (
    <>
      <Header />
      <main className="bg-profile px-10 lg:px-22 py-10 space-y-3">
        <section className="text-white text-2xl font-extrabold">
          User Profile
        </section>
        <section className="flex flex-col lg:flex-row bg-white rounded-2xl">
          <section className="flex-1 flex flex-col items-center p-10">
            <img
              src={placeholderImage}
              alt=""
              className="w-44 aspect-square object-cover rounded-full mb-3"
            />
            <p className="font-semibold text-lg">Zulaikha</p>
            <p className="mb-5">zulaikha17@gmail.com</p>
            <button className="bg-secondary py-3 w-[75%] rounded-2xl mb-3 text-tertiary font-semibold shadow-lg">
              Choose photo
            </button>
            <button className="bg-tertiary secondary py-3 w-[75%] rounded-2xl mb-8 text-white font-semibold shadow-lg">
              Remove photo
            </button>
            <button className="bg-white border-2  secondary py-4 w-[75%] rounded-2xl mb-8 text-tertiary font-semibold shadow-lg">
              Edit Password
            </button>
            <p className="text-tertiary text-xl mb-4 text-center font-bold">
              Do you want to save the change?
            </p>
            <button
              className="bg-tertiary border-2  secondary py-4 w-[75%] rounded-2xl mb-3 text-white font-semibold text-xl shadow-lg"
              id="saveChange"
            >
              Save Change
            </button>
            <button className="bg-secondary border-2  secondary py-4 w-[75%] rounded-2xl mb-3 text-tertiary font-semibold text-xl shadow-lg">
              Cancel
            </button>
            <button className="mt-10 bg-white border-2  secondary py-4 w-[75%] rounded-2xl mb-8 text-tertiary font-semibold shadow-lg">
              Log out
            </button>
          </section>
          <section className="flex-[2_2_0%] p-10 lg:pl-0">
            <div className="bg-white drop-shadow-2xl rounded-xl border-b-[6px] border-solid border-[#6a4029] px-5 py-3 relative">
              <div className="absolute top-3 bg-tertiary p-2 rounded-full right-3 cursor-pointer select-none">
                <img src={iconPen} alt="" />
              </div>
              <p className="text-primary text-xl font-bold">Contacts</p>
              <div className="grid lg:grid-cols-[55%_35%] gap-x-5 gap-y-8 py-5">
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[#9f9f9f]">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value="zulaikha17@gmail.com"
                    id="email"
                    className="focus:outline-none border-b-[1px] border-black w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[#9f9f9f]">
                    Mobile number
                  </label>
                  <input
                    type="text"
                    value="(+62)813456782"
                    id="phone"
                    className="focus:outline-none border-b-[1px] border-black w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[#9f9f9f]">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value="Iskandar Street no. 67 Block A Near Bus Stop"
                    id="deliveryAddres"
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
                    value="Zulaikha"
                    id="displayName"
                    className="focus:outline-none border-b-[1px] border-black w-full"
                  />
                </div>
                <div className="input">
                  <label htmlFor="email" className="text-[#9f9f9f]">
                    DD/MM/YY
                  </label>
                  <input
                    type="text"
                    value="03/04/90"
                    id="birthdate"
                    className="focus:outline-none border-b-[1px] border-black w-full"
                  />
                </div>
                <div className="input">
                  <label htmlFor="email" className="text-[#9f9f9f]">
                    First name
                  </label>
                  <input
                    type="text"
                    value="Zulaikha"
                    id="firstName"
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
                    value="Nirmala"
                    id="lastName"
                    className="focus:outline-none border-b-[1px] border-black w-full"
                  />
                </div>
              </div>
              <div className="gender center">
                <div className="male">
                  <input type="radio" id="gender" name="gender" value="male" />
                  <label htmlFor="age1">
                    <span>
                      <span></span>
                    </span>
                    Male
                  </label>
                </div>
                <div className="female">
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    value="60"
                    checked
                  />

                  <label htmlFor="age2" className="active">
                    <span>
                      <span></span>
                    </span>
                    Female
                  </label>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Profile;
