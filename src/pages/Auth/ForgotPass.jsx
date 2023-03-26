import React from 'react';

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import icon from '../../assets/jokopi.svg';
import { forgotPass } from '../../utils/dataProvider/auth';
import useDocumentTitle from '../../utils/documentTitle';

const ForgotPass = () => {
  useDocumentTitle("Forgot Password");

  const controller = React.useMemo(() => new AbortController(), []);
  const [email, setEmail] = React.useState("");

  function forgotPassHandler(e) {
    e.preventDefault(); // preventing default submit
    toast.dismiss(); // dismiss all toast

    toast.promise(
      forgotPass(email, controller).then((res) => {
        // console.log(res.data.data.token);
        return res.data;
      }),
      {
        loading: "Please wait a moment",
        success: "We sent a code to your email!",
        error: (e) => {
          return e.response.data.msg;
        },
      }
    );
  }

  function handleChange(e) {
    return setEmail(e.target.value);
  }

  return (
    <>
      <header className="flex justify-center mb-10">
        <Link to="/">
          <div className="font-extrabold flex flex-row justify-center gap-4">
            <img src={icon} alt="logo" width="30px" />
            <h1 className="text-xl">jokopi.</h1>
          </div>
        </Link>
      </header>
      <section className="mt-16">
        <form
          action=""
          method="post"
          className="space-y-4 md:space-y-6 relative"
        >
          <div className="space-y-5">
            <h2 className="font-bold text-3xl text-center">
              Forgot your password?
            </h2>
            <p className="text-xl text-center">
              Don’t worry, we got your back!
            </p>
          </div>
          <div>
            <input
              type="text"
              name="email"
              id="email"
              className="border-gray-400 border-2 rounded-2xl p-3 w-full mt-2"
              placeholder="Enter your email adress to get link"
              value={email}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
            onClick={forgotPassHandler}
          >
            Send
          </button>
        </form>
        <section className="text-center mt-10 space-y-2">
          <p>Click here if you didn’t receive any link in 2 minutes</p>
          <p className="font-bold">01:52</p>
          <button
            type="submit"
            className="w-full text-white bg-tertiary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
          >
            Resend Link
          </button>
        </section>
      </section>
    </>
  );
};

export default ForgotPass;
