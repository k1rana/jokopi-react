import axios from "axios";

const host = process.env.REACT_APP_BACKEND_HOST;

const api = axios.create({
  baseURL: host,
});

export default api;
