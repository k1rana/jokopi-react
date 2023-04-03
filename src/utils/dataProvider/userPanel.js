import axios from 'axios';

import _http from './https';

const host = process.env.REACT_APP_BACKEND_HOST;

export function fetchProfile(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${host}/apiv1/userPanel/profile`, config);
}

export function addCart(product_id, cart, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    product_id,
    cart,
  };
  return axios.patch(`${host}/apiv1/userPanel/cart`, data, config);
}
