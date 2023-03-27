import axios from 'axios';

const host = process.env.REACT_APP_BACKEND_HOST;

export function getAllProducts(catId, controller) {
  const url = `${host}/apiv1/products?category=${catId}`;

  return axios.get(url, {
    signal: controller.signal,
  });
}

export function getProductbyId(productId, controller) {
  const url = `${host}/apiv1/products/${productId}`;

  return axios.get(url, {
    signal: controller.signal,
  });
}
