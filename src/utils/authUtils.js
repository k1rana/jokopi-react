import jwt_decode from "jwt-decode";

import { uinfoAct } from "../redux/slices/userInfo.slice";
import store from "../redux/store";

export function uinfoFromRedux() {
  const state = store.getState();
  const userInfo = state.userInfo;
  return userInfo;
}

export function isAuthenticated() {
  const userInfo = uinfoFromRedux();
  if (userInfo.token.length > 0) {
    const decoded = jwt_decode(userInfo.token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      store.dispatch(uinfoAct.dismissToken());
      return false;
    }

    return true;
  } else {
    return false;
  }
}

export function getUserData() {
  const userInfo = uinfoFromRedux();
  if (userInfo.token.length > 0) {
    const decoded = jwt_decode(userInfo.token);
    return decoded;
  }
  return {};
}
