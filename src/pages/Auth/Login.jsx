import React, { useState } from "react";

import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import icon from "../../assets/jokopi.svg";
import { profileAction } from "../../redux/slices/profile.slice";
import { uinfoAct } from "../../redux/slices/userInfo.slice";
import { login } from "../../utils/dataProvider/auth";
import useDocumentTitle from "../../utils/documentTitle";

const Login = () => {
  const navigate = useNavigate();
  useDocumentTitle("Login");

  const controller = React.useMemo(() => new AbortController(), []);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function loginHandler(e) {
    e.preventDefault(); // preventing default submit
    toast.dismiss(); // dismiss all toast
    const valid = { email: "", password: "" };

    if (!form.email) valid.email = "Input your email address";
    if (!form.password) valid.password = "Input your password";

    setError({
      email: valid.email,
      password: valid.password,
    });

    if (valid.email == "" && valid.password == "" && !isLoading) {
      setIsLoading(true);
      toast.promise(
        login(form.email, form.password, form.rememberMe, controller).then(
          (res) => {
            // console.log(res.data);
            // console.log(res.data.data.token);
            dispatch(uinfoAct.assignToken(res.data.data.token));
            const { role } = jwtDecode(res.data.data.token);
            dispatch(uinfoAct.assignData({ role }));
            dispatch(
              profileAction.getProfileThunk({
                controller,
                token: res.data.data.token,
              })
            );
            return res.data.data.token;
          }
        ),
        {
          loading: () => {
            e.target.disabled = true;
            return "Please wait a moment";
          },
          success: () => {
            navigate("/products");
            toast.success("Welcome to jokopi!\nYou can order for now!", {
              icon: "👋",
              duration: Infinity,
            }); // add toast welcome
            return (
              <>
                Login successful!
                <br /> Redirecting you
              </>
            );
          },
          error: () => {
            setIsLoading(false);
            e.target.disabled = false;
            return "Incorrect email or password";
          },
        }
      );
    }
  }

  function onChangeForm(e) {
    return setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  }

  function onCheck(e) {
    return setForm((form) => {
      return {
        ...form,
        [e.target.name]: !form[e.target.name],
      };
    });
  }

  return (
    <>
      <header className="flex justify-between mb-10">
        <Link to="/">
          <div className="font-extrabold flex flex-row justify-center gap-4">
            <img src={icon} alt="logo" width="30px" />
            <h1 className="text-xl">jokopi.</h1>
          </div>
        </Link>
        <div className="text-lg md:text-xl font-semibold text-tertiary">
          Login
        </div>
      </header>
      <section className="mt-16">
        <form className="space-y-3 md:space-y-4 relative">
          <div>
            <label
              name="email"
              htmlFor="email"
              className="text-[#4F5665] font-bold"
            >
              Email address :
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={
                `border-gray-400 border-2 rounded-2xl p-3 w-full mt-2` +
                (error.email != "" ? " border-red-500" : "")
              }
              placeholder="Enter your email address"
              value={form.email}
              onChange={onChangeForm}
            />
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
              {error.email != "" ? error.email : ""}
            </span>
          </div>
          <div>
            <label
              name="password"
              htmlFor="password"
              className="text-[#4F5665] font-bold"
            >
              Password :
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={
                `border-gray-400 border-2 rounded-2xl p-3 w-full mt-2` +
                (error.password != "" ? " border-red-500" : "")
              }
              placeholder="Enter your password"
              value={form.password}
              onChange={onChangeForm}
            />
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
              {error.password != "" ? error.password : ""}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  onChange={onCheck}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <Link
              to="/auth/forgotpass"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              name="rememberMe"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className={
              (isLoading
                ? "cursor-not-allowed bg-secondary-200"
                : "cursor-pointer bg-secondary") +
              " w-full text-tertiary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-base md:text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl inline-flex items-center justify-center transition ease-in-out duration-150 hover:bg-secondary-200"
            }
            onClick={loginHandler}
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              ""
            )}
            Login
          </button>
          <button
            type="submit"
            className="w-full text-tertiary bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-base md:text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl inline-flex justify-center items-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt=""
              width="23px"
              className="w  -5 h-5 mr-2"
            />
            <span>Login with Google</span>
          </button>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 w-56">
              Don’t have an account?
            </span>
          </div>
          <Link to="/auth/register">
            <button className="w-full text-white bg-tertiary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-base md:text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl lg:mb-20">
              Sign up here
            </button>
          </Link>
        </form>
      </section>
    </>
  );
};

export default Login;
