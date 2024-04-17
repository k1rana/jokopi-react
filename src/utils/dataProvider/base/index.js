import axios from "axios";

const host = import.meta.env.VITE_BACKEND_HOST;

const baseRestApi = axios.create({
  baseURL: host,
});

export default baseRestApi;
