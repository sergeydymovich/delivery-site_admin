import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersApi } from "api/api";

const ORDERS_PAGE_SIZE = 10;

export const getOrders = createAsyncThunk(
  "orders/get",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { startDate, endDate, noLimit } = params;
      const { activePage, filterWord } = getState().orders.requestOptions;

      const response = await ordersApi.get({
        startDate: startDate || '',
        endDate: endDate || '',
        pageSize: noLimit ? '' : ORDERS_PAGE_SIZE,
        offset: noLimit ? '' : (activePage - 1) * ORDERS_PAGE_SIZE,
        filterWord
        });

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

const INITIAL_STATE = {
  ordersArr: [],
  requestOptions: {
    activePage: 1,
    pagesAmount: 0,
    filterWord: '',
  }
}

export const ordersSlice = createSlice({
  name: "orders",
  initialState: INITIAL_STATE,
  reducers: {
    changeActivePage: (state, action) => {
      state.requestOptions.activePage = action.payload;
    },
    changeFilterWord: (state, action) => {
      state.requestOptions.filterWord = action.payload;
      state.requestOptions.activePage = 1;
    },
    setInitialState: () => { 
      return INITIAL_STATE;
    },
  },
  extraReducers: {
    [getOrders.pending]: () => {},
    [getOrders.fulfilled]: (state, action) => {
      state.ordersArr = action.payload.orders;
      state.requestOptions.pagesAmount = Math.ceil(action.payload.ordersAmount / ORDERS_PAGE_SIZE);
    },
    [getOrders.rejected]: () => {},
  },
});

export const { changeActivePage, changeFilterWord, setInitialState } = ordersSlice.actions;

export default ordersSlice.reducer;