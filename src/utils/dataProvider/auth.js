import baseRestApi from "./base";

export function login(email, password, rememberMe, controller) {
  const body = { email, password, rememberMe };
  const url = `/apiv1/auth/login`;

  return baseRestApi.post(url, body, {
    signal: controller.signal,
  });
}

export function register(email, password, phone_number, controller) {
  const body = { email, password, phone_number };
  const url = `/apiv1/auth/register`;

  return baseRestApi.post(url, body, {
    signal: controller.signal,
  });
}

export function forgotPass(email, controller) {
  const body = { email };
  const url = `/apiv1/auth/forgotPass`;

  return baseRestApi.post(url, body, {
    signal: controller.signal,
  });
}

export function verifyResetPass(verify, code, controller) {
  const url = `/apiv1/auth/resetPass?verify=${verify}&code=${code}`;

  return baseRestApi.get(url, {
    signal: controller.signal,
  });
}

export function resetPass(verify, code, password, controller) {
  const url = `/apiv1/auth/resetPass?verify=${verify}&code=${code}`;

  return baseRestApi.patch(
    url,
    { newPassword: password },
    {
      signal: controller.signal,
    }
  );
}

export function logoutUser(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `/apiv1/auth/logout`;
  return baseRestApi.delete(url, config);
}
