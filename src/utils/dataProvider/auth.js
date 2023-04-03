import axios from "axios";

import store from "../../redux/store";

const state = store.getState();
const userInfo = state.userInfo;

const host = process.env.REACT_APP_BACKEND_HOST;
const config = {
  headers: {
    Authorization: "Bearer " + userInfo.token,
  },
};

export function login(email, password, rememberMe, controller) {
  const body = { email, password, rememberMe };
  const url = `${host}/apiv1/auth/login`;

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

export function logoutUser(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `${host}/apiv1/auth/logout`;
  return axios.delete(url, config);
}
