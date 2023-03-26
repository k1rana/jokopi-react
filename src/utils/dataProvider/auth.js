import axios from "axios";

const host = process.env.REACT_APP_BACKEND_HOST;

export function login(email, password, controller) {
  const body = { email, password };
  const url = `${host}/auth/login`;

  return axios.post(url, body, {
    signal: controller.signal,
  });
}

export function register(email, password, phone_number, controller) {
  const body = { email, password, phone_number };
  const url = `${host}/apiv1/auth/register`;

  return axios.post(url, body, {
    signal: controller.signal,
  });
}

export function forgotPass(email, controller) {
  const body = { email };
  const url = `${host}/apiv1/auth/forgotPass`;

  return axios.post(url, body, {
    signal: controller.signal,
  });
}
