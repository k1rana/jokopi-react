import React, { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";

import notfoundImage from "../../assets/images/empty-box.svg";
import loadingImage from "../../assets/images/loading.svg";
import icon from "../../assets/jokopi.svg";
import { verifyResetPass } from "../../utils/dataProvider/auth";

function ResetPass() {
  const [error, setError] = useState("");
  const [pass, setPass] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  function handleChange(e) {
    return setPass(e.target.value);
  }

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    verifyResetPass(
      searchParams.get("verify"),
      searchParams.get("code"),
      controller
    )
      .then((res) => {
        setIsLoading(false);
      })
      .catch((res) => {
        setIsLoading(false);
        setIsNotFound(true);
      });
  }, []);
  const Loading = (props) => {
    return (
      <main className="h-[50vh] flex items-center justify-center">
        <div>
          <img src={loadingImage} alt="Loading..." />
        </div>
      </main>
    );
  };
  const NotFound = (props) => {
    return (
      <main className="h-[80vh] flex flex-col items-center justify-center">
        <img src={notfoundImage} alt="Not Found" className="w-72" />
        <p>The link has expired</p>
      </main>
    );
  };

  function resetPassHandler(e) {
    e.preventDefault(); // preventing default submit
    toast.dismiss(); // dismiss all toast

    let err = "";
    if (password.length < 1) {
      err = "Password must be 8 character or higher";
    }
    setError(err);
    if (!isLoading && err.length < 1) {
      setIsLoading(true);
      e.target.disabled = true;
      toast.promise(
        verifyResetPass(searchParams.get("verify"), controller).then((res) => {
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
      {isNotFound ? (
        <NotFound />
      ) : isLoading ? (
        <Loading />
      ) : (
        <section>
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
              <p className="text-center">
                You have requested a link to reset your password, please enter a
                new password to access your account
              </p>
              <input
                type="password"
                name="pass"
                id="pass"
                className={
                  `border-gray-400 border-2 rounded-2xl p-3 w-full mt-2` +
                  (error !== "" ? " border-red-500" : "")
                }
                placeholder="Enter your new password"
                value={pass}
                onChange={handleChange}
              />
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
                {error !== "" ? error : ""}
              </span>
              <button
                type="submit"
                className="w-full text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
                onClick={resetPassHandler}
              >
                Send
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

export default ResetPass;
