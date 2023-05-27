import { combineReducers } from "redux";

import cartSlice from "./cart.slice";
import contextSlice from "./context.slice";
import profileSlice from "./profile.slice";
import uinfoSlice from "./userInfo.slice";

const reducers = combineReducers({
  userInfo: uinfoSlice,
  profile: profileSlice,
  cart: cartSlice,
  context: contextSlice,
});

export default reducers;
