import React from "react";

import placeholderImage from "../assets/images/placeholder-profile.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useDocumentTitle from "../helpers/documentTitle";

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
          <section className="flex-[2_2_0%]">
            <div className="card-profile-settings">
              <div className="icon-round">
                <svg
                  width="16px"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6168 1.8356C14.8552 1.57068 15.1383 1.36054 15.4498 1.21716C15.7613 1.07379 16.0952 1 16.4324 1C16.7696 1 17.1035 1.07379 17.415 1.21716C17.7265 1.36054 18.0095 1.57068 18.248 1.8356C18.4864 2.10051 18.6755 2.41501 18.8046 2.76114C18.9336 3.10727 19 3.47825 19 3.8529C19 4.22755 18.9336 4.59853 18.8046 4.94466C18.6755 5.29079 18.4864 5.60529 18.248 5.87021L5.99283 19.487L1 21L2.36168 15.4524L14.6168 1.8356Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="title">Contacts</p>
              <div className="form-contacts">
                <div className="input">
                  <label htmlFor="email">Email Address</label>
                  <input type="text" value="zulaikha17@gmail.com" id="email" />
                </div>
                <div className="input">
                  <label htmlFor="email">Mobile number</label>
                  <input type="text" value="(+62)813456782" id="phone" />
                </div>
                <div className="input">
                  <label htmlFor="email">Delivery Address</label>
                  <input
                    type="text"
                    value="Iskandar Street no. 67 Block A Near Bus Stop"
                    id="deliveryAddres"
                  />
                </div>
              </div>
              <p className="title">Details</p>
              <div className="form-contacts">
                <div className="input">
                  <label htmlFor="email">Display name</label>
                  <input type="text" value="Zulaikha" id="displayName" />
                </div>
                <div className="input">
                  <label htmlFor="email">DD/MM/YY</label>
                  <input type="text" value="03/04/90" id="birthdate" />
                </div>
                <div className="input">
                  <label htmlFor="email">First name</label>
                  <input type="text" value="Zulaikha" id="firstName" />
                </div>
                <div className="input"></div>
                <div className="input">
                  <label htmlFor="email">Last name</label>
                  <input type="text" value="Nirmala" id="lastName" />
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
