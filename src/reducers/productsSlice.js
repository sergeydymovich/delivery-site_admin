import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetProducts } from "api/api";

export const getProducts = createAsyncThunk(
  "/products",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { activePage, pageSize } = getState().products.requestOptions;
      const response = await fetchGetProducts({
        pageSize,
        offset: (activePage - 1) * pageSize,
      });

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsArr: [],
    requestOptions: {
      activePage: 1,
      pageSize: 1,
      pagesAmount: 0,
    }
  },
  reducers: {
    addProduct: (state, action) => {
      state.productsArr.push(action.payload);
    },
    changeActivePage: (state, action) => {
      state.requestOptions.activePage = action.payload;
    },
  },
  extraReducers: {
    [getProducts.pending]: () => {},
    [getProducts.fulfilled]: (state, action) => {
      state.productsArr = action.payload.products;
      state.requestOptions.pagesAmount = Math.ceil(action.payload.productsAmount / state.requestOptions.pageSize);  
    },
    [getProducts.rejected]: () => {},
  },
});

export const { addProduct, changeActivePage } = productsSlice.actions;

export default productsSlice.reducer;