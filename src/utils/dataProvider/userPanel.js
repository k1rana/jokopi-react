import baseRestApi from "./base";

export function fetchProfile(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return baseRestApi.get(`/apiv1/userPanel/profile`, config);
}

export function addCart(product_id, cart, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    product_id,
    cart,
  };
  return baseRestApi.patch(`/apiv1/userPanel/cart`, data, config);
}

export function getCart(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return baseRestApi.get(`/apiv1/userPanel/cart`, config);
}

export function updatePassword(oldPassword, newPassword, token) {
  const body = {
    oldPassword,
    newPassword,
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return baseRestApi.patch(`/apiv1/auth/editPassword`, body, config);
}

export function updateProfile(data, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return baseRestApi.patch(`/apiv1/auth/editProfile`, data, config);
}
