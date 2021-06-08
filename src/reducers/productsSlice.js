import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetProducts } from "api/api";

export const getProducts = createAsyncThunk(
  "/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchGetProducts();

      return response.data.products;
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

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
  extraReducers: {
    [getProducts.pending]: () => {},
    [getProducts.fulfilled]: (state, action) => {
      state.productsArr = action.payload;
    },
    [getProducts.rejected]: () => {},
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;