import {  createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsArr: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.productsArr.push(action.payload);
    },
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;