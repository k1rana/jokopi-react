import baseRestApi from "./base";

export const getMonthlyReport = (token, controller) => {
  return baseRestApi.get("/apiv1/adminPanel/monthlyReport", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  });
};

export const getSellingReport = (view = "monthly", token, controller) => {
  return baseRestApi.get("/apiv1/adminPanel/reports", {
    params: {
      view,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  });
};
