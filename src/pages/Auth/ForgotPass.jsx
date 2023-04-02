import React, { useEffect, useState } from "react";

import { now } from "lodash";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import icon from "../../assets/jokopi.svg";
import { forgotPass } from "../../utils/dataProvider/auth";
import useDocumentTitle from "../../utils/documentTitle";

const ForgotPass = () => {
  useDocumentTitle("Forgot Password");

  const controller = React.useMemo(() => new AbortController(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = useState("");
  const [resend, setResend] = useState(0);
  const [time, setTime] = useState(0);
  const [displaycd, setDisplaycd] = useState("");

  function forgotPassHandler(e) {
    e.preventDefault(); // preventing default submit
    toast.dismiss(); // dismiss all toast

    setResend(now() + 2 * 60 * 1000); // now + 2 minutes
    let err = "";
    if (email.length < 1) {
      err = "Must input email!";
    }
    setError(err);
    if (!isLoading && err.length < 1) {
      setIsLoading(true);
      e.target.disabled = true;
      toast.promise(
        forgotPass(email, controller).then((res) => {
          // console.log(res.data.data.token);
          setResend(now() + 2 * 60 * 1000); // now + 2 minutes
          e.target.disabled = false;
          setIsLoading(false);
          return res.data;
        }),
        {
          loading: "Please wait a moment",
          success: "We sent a code to your email!",
          error: (err) => {
            e.target.disabled = false;
            setIsLoading(false);
            return err.response.data.msg;
          },
        }
      );
    }
  }

  function countdownFormat(ms) {
    const time = new Date(ms).toISOString().substr(14, 5);
    const timeFormat = time.replace(":", ".");
    return timeFormat;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (resend > 0 && resend > now()) {
        const newSec = resend - 1000;
        setResend(newSec);
        setDisplaycd(countdownFormat(newSec - now()));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
              className={
                `border-gray-400 border-2 rounded-2xl p-3 w-full mt-2` +
                (error !== "" ? " border-red-500" : "")
              }
              placeholder="Enter your email adress to get link"
              value={email}
              onChange={handleChange}
            />
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
              {error !== "" ? error : ""}
            </span>
          </div>
          <button
            type="submit"
            className="w-full text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
            onClick={forgotPassHandler}
          >
            Send
          </button>
        </form>
        {resend >= now() ? (
          <section className="text-center mt-10 space-y-2">
            <p>Click here if you didn’t receive any link in 2 minutes</p>
            <p className="font-bold">{displaycd}</p>
            <button
              type="submit"
              className="w-full text-white bg-tertiary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
            >
              Resend Link
            </button>
          </section>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default ForgotPass;
