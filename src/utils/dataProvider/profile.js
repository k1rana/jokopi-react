import api from "./base";

export const getProfile = (token, controller) => {
  return api.get("/apiv1/userPanel/profile", {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  });
};

export const editProfile = (
  {
    image = "",
    display_name = "",
    address = "",
    birthdate = "",
    gender = "",
    email = "",
    phone_number = "",
    first_name = "",
    last_name = "",
  },
  token,
  controller
) => {
  const body = new FormData();
  // append
  // console.log(image);
  body.append("image", image);
  body.append("display_name", display_name);
  body.append("address", address);
  body.append("birthdate", JSON.stringify(birthdate));
  body.append("gender", gender);
  body.append("email", email);
  body.append("phone_number", phone_number);
  body.append("first_name", first_name);
  body.append("last_name", last_name);

  // const bodyObj = {
  //   image,
  //   display_name,
  //   address,
  //   birthdate,
  //   gender,
  //   email,
  //   phone_number,
  // };
  return api.patch("/apiv1/userPanel/profile", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    signal: controller.signal,
  });
};
