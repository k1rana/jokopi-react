import { combineReducers } from 'redux';

import uinfoSlice from './userInfo.slice';

const reducers = combineReducers({
  userInfo: uinfoSlice,
});

export default reducers;
