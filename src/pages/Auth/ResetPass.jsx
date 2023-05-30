import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import notfoundImage from "../../assets/images/empty-box.svg";
import loadingImage from "../../assets/images/loading.svg";
import icon from "../../assets/jokopi.svg";
import { resetPass, verifyResetPass } from "../../utils/dataProvider/auth";

function ResetPass() {
  const [error, setError] = useState("");
  const [pass, setPass] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const navigate = useNavigate();

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
    if (pass.length < 8) {
      err = "Password must be 8 character or higher";
    }
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(pass)) {
      err = "Password must alphanumeric";
    }
    setError(err);
    if (!isLoading && err.length < 1) {
      setIsLoading(true);
      e.target.disabled = true;
      const controller = new AbortController();
      toast.promise(
        resetPass(
          searchParams.get("verify"),
          searchParams.get("code"),
          pass,
          controller
        ).then((res) => {
          // console.log(res.data.data.token);
          // setResend(now() + 2 * 60 * 1000); // now + 2 minutes
          e.target.disabled = false;
          setIsLoading(false);
          navigate("/auth/login", { replace: true });
          return res.data;
        }),
        {
          loading: "Please wait a moment",
          success: "The new password has been set successfully",
          error: (err) => {
            e.target.disabled = false;
            setIsLoading(false);
            if (err.response) return err.response?.data?.msg;
            return err.message;
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
                className="w-full text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl mt-4"
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
