import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProfile } from "../../utils/dataProvider/profile";

const initialState = {
  data: {
    user_id: 0,
    display_name: null,
    first_name: null,
    last_name: null,
    address: null,
    birthdate: null,
    img: null,
    created_at: "",
    email: "",
    phone_number: "",
  },
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getProfileThunk = createAsyncThunk(
  "profile/get",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { controller, token } = payload;
      const response = await getProfile(token, controller);
      // console.log(response.data.data);
      if (response.status !== "200") {
        rejectWithValue(response.data.msg);
      }
      fulfillWithValue(response.data.data[0]);
      return response.data.data[0];
    } catch (err) {
      console.log(err);
      // store.dispatch(authAction.dismissAuth());
      rejectWithValue(err.message);
      return;
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (prevState) => {
      return {
        data: {
          user_id: 0,
          display_name: null,
          first_name: null,
          last_name: null,
          address: null,
          birthdate: null,
          img: null,
          created_at: "",
          email: "",
          phone_number: "",
        },
        isLoading: false,
        isRejected: false,
        isFulfilled: false,
        err: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      })
      .addCase(getProfileThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getProfileThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});
export const profileAction = { ...profileSlice.actions, getProfileThunk };
export default profileSlice.reducer;
