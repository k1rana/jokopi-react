import { createSlice } from "@reduxjs/toolkit";

const contextSlice = createSlice({
  name: "context",
  initialState: {
    logout: false,
  },
  reducers: {
    toggleLogout: (prevState, action) => {
      return {
        ...prevState,
        logout: !prevState.logout,
      };
    },
    openLogout: (prevState, action) => {
      return {
        ...prevState,
        logout: true,
      };
    },
    closeLogout: (prevState, action) => {
      return {
        ...prevState,
        logout: false,
      };
    },
  },
});

export const contextAct = contextSlice.actions;
export default contextSlice.reducer;
