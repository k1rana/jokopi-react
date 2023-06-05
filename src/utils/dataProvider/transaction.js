import api from './base';

export const createTransaction = (
  {
    payment_id = 1,
    delivery_id = 1,
    status_id = 3,
    address = "Table no 4",
    notes = "Makkah",
  },
  products = [],
  token,
  controller
) => {
  const body = {
    payment_id,
    delivery_id,
    status_id,
    products,
    address,
    notes,
  };
  return api.post(`/apiv1/transactions`, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTransactions = (
  { status_id = 1, page = 1 },
  token,
  controller
) => {
  return api.get("/apiv1/transactions", {
    params: {
      status_id,
      page,
    },
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  });
};

export const setTransactionDone = (ids = [], token, controller) => {
  let convertedIds = ids.toString();
  if (typeof ids === "object") {
    convertedIds = ids.join(",");
  }
  console.log(convertedIds);
  return api.patch(
    "/apiv1/transactions/changeStatus",
    {
      transactions: convertedIds,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    }
  );
};

export const getTransactionHistory = (
  { page = "1", limit = "9" },
  token,
  controller
) => {
  return api.get("/apiv1/userPanel/transactions", {
    params: {
      page,
      limit,
    },
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  });
};

export const getTransactionDetail = (transactionId, token, controller) => {
  return api.get(`/apiv1/transactions/${transactionId}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  });
};
