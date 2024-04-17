import baseRestApi from "./base";

export function getAllProducts(
  catId = "",
  { orderBy = "", sort = "", searchByName = "", limit = "10", page = "1" },
  controller
) {
  const params = { orderBy, sort, searchByName, limit, page };
  const url = `/apiv1/products?category=${catId}`;

  return baseRestApi.get(url, { params, signal: controller.signal });
}

export function getProductbyId(productId, controller) {
  const url = `/apiv1/products/${productId}`;

  return baseRestApi.get(url, {
    signal: controller.signal,
  });
}

export const createProductEntry = (
  { name = "", price = "", category_id = "", desc = "", image = "" },
  token,
  controller
) => {
  const bodyForm = new FormData();
  bodyForm.append("image", image);
  bodyForm.append("name", name);
  bodyForm.append("category_id", category_id);
  bodyForm.append("desc", desc);
  bodyForm.append("price", price);

  // const body = {
  //   name,
  //   price,
  //   category_id,
  //   desc,
  //   image,
  // };
  // console.log(image);
  return baseRestApi.post("/apiv1/products", bodyForm, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    signal: controller.signal,
  });
};

export const editProductEntry = (
  { name = "", price = "", category_id = "", desc = "", image = "" },
  productId,
  token,
  controller
) => {
  const bodyForm = new FormData();
  if (image?.uri && image?.uri !== "") bodyForm.append("image", image);
  bodyForm.append("name", name);
  bodyForm.append("category_id", category_id);
  bodyForm.append("desc", desc);
  bodyForm.append("price", price);

  // const body = {
  //   name,
  //   price,
  //   category_id,
  //   desc,
  //   image,
  // };
  return baseRestApi.patch(`/apiv1/products/${productId}`, bodyForm, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    signal: controller.signal,
  });
};

export const deleteProductEntry = (productId, token, controller) => {
  return baseRestApi.delete(`/apiv1/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  });
};
