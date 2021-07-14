import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsApi } from "api/api";

const PRODUCTS_PAGE_SIZE = 1;

export const getProducts = createAsyncThunk(
  "products/get",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { activePage, filterWord } = getState().products.requestOptions;
      const response = await productsApi.get({
        pageSize: PRODUCTS_PAGE_SIZE,
        offset: (activePage - 1) * PRODUCTS_PAGE_SIZE,
        filterWord
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
      pagesAmount: 0,
      filterWord: '',
    }
  },
  reducers: {
    addProduct: (state, action) => {
      state.productsArr.push(action.payload);
    },
    changeActivePage: (state, action) => {
      state.requestOptions.activePage = action.payload;
    },
    changeFilterWord: (state, action) => {
      state.requestOptions.filterWord = action.payload;
      state.requestOptions.activePage = 1;
    },
  },
  extraReducers: {
    [getProducts.pending]: () => {},
    [getProducts.fulfilled]: (state, action) => {
      state.productsArr = action.payload.products;
      state.requestOptions.pagesAmount = Math.ceil(action.payload.products_amount / PRODUCTS_PAGE_SIZE);  
    },
    [getProducts.rejected]: () => {},
  },
});

export const { addProduct, changeActivePage, changeFilterWord } = productsSlice.actions;

export default productsSlice.reducer;