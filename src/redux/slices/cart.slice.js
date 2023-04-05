import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: "cart",
  initialState: { products: [], promo: "" },
  reducers: {
    addCart: (prevState, action) => {
      return { ...prevState, products: action.payload };
    },
  },
});

export const cartAct = cartSlice.actions;
export default cartSlice;
