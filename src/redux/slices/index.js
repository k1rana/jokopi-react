import { combineReducers } from "redux";

import cartSlice from "./cart.slice";
import profileSlice from "./profile.slice";
import uinfoSlice from "./userInfo.slice";

const reducers = combineReducers({
  userInfo: uinfoSlice,
  profile: profileSlice,
  cart: cartSlice,
});

export default reducers;
