import axios from "axios";
import { useSelector } from "react-redux";

const host = process.env.REACT_APP_BACKEND_HOST;

const instance = axios.create({
  baseURL: "http://jokopi.vercel.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
instance.interceptors.request.use(function (config) {
  const token = useSelector((state) => state.userInfo?.token);
  config.baseURL = "https://jokopi.vercel.app";
  config.headers.Authorization = "Bearer " + token;
  return config;
});

export default instance;
