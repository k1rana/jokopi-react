import api from "./base";

export const getPromos = ({}) => {
  return api.get();
};

export const createPromoEntry = (form, token, controller) => {
  form.coupon_code = form.coupon_code.toUpperCase();
  return api.post("/apiv1/promo", form, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};
