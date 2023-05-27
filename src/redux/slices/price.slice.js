import { getSizePrice } from "../../utils/https/product";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getPriceBySize = createAsyncThunk(
  "posts/getPriceBySize",
  async ({ controller }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const result = await getSizePrice(controller);
      fulfillWithValue(result?.data.data);
      return result?.data.data;
    } catch (err) {
      // You can choose to use the message attached to err or write a custom error
      return rejectWithValue("Oops there seems to be an error");
    }
  }
);

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPriceBySize.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      })
      .addCase(getPriceBySize.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getPriceBySize.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const priceActions = { ...priceSlice.actions, getPriceBySize };
export default priceSlice.reducer;
