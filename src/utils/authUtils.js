import jwt_decode from 'jwt-decode';

export function isAuthenticated() {
  const key = `${process.env.REACT_APP_WEBSITE_NAME}-token`;
  const token = localStorage.getItem(key);

  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem(key);
      return false;
    }

    return true;
  } else {
    return false;
  }
}
