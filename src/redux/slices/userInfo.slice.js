import { createSlice } from "@reduxjs/toolkit";

const uinfoSlice = createSlice({
  name: `${process.env.REACT_APP_WEBSITE_NAME}_appdata`,
  initialState: {
    token: "",
    newToken: "",
    role: "",
  },
  reducers: {
    assignToken: (prevState, action) => {
      return {
        ...prevState,
        token: action.payload,
      };
    },
    assignData: (prevState, action) => {
      return {
        ...prevState,
        role: action.payload.role,
      };
    },
    dismissToken: (prevState) => {
      return {
        ...prevState,
        token: "",
        role: "",
      };
    },
  },
});

export const uinfoAct = uinfoSlice.actions;
export default uinfoSlice.reducer;
