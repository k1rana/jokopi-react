import api from "./base";

export const createPromoEntry = (form, token, controller) => {
  form.coupon_code = form.coupon_code.toUpperCase();
  return api.post("/apiv1/promo", form, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPromos = (
  { page = 1, limit = 4, available = "true", searchByName = "" },
  controller
) => {
  const params = {
    page,
    limit,
    available,
    searchByName,
  };
  return api.get("/apiv1/promo", {
    params,
    signal: controller.signal,
  });
};
