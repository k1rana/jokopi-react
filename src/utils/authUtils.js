import jwt_decode from 'jwt-decode';

import { uinfoAct } from '../redux/slices/userInfo.slice';
import store from '../redux/store';
import { logoutUser } from './dataProvider/auth';

export function uinfoFromRedux() {
  const state = store.getState();
  const userInfo = state.userInfo;
  return userInfo;
}

export function isAuthenticated() {
  const userInfo = uinfoFromRedux();
  if (userInfo.token) {
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
  if (userInfo.token) {
    const decoded = jwt_decode(userInfo.token);
    return decoded;
  }
  return {};
}

export function logout() {
  const userInfo = uinfoFromRedux();
  if (userInfo.token) {
    logoutUser()
      .then(() => store.dispatch(uinfoAct.dismissToken()))
      .catch(() => false);
    return true;
  }
  return false;
}
