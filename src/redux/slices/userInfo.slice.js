import { createSlice } from '@reduxjs/toolkit';

const uinfoSlice = createSlice({
  name: `${process.env.REACT_APP_WEBSITE_NAME}_appdata`,
  initialState: {
    token: "",
    newToken: "",
  },
  reducers: {
    assignToken: (prevState, action) => {
      return {
        ...prevState,
        token: action.payload,
      };
    },
    dismissToken: (prevState) => {
      return {
        ...prevState,
        token: "",
      };
    },
  },
});

export const uinfoAct = uinfoSlice.actions;
export default uinfoSlice.reducer;
