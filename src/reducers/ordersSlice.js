import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetOrders } from "api/api";

const ORDERS_PAGE_SIZE = 1;

export const getOrders = createAsyncThunk(
  "/orders",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { startDate, endDate } = params;
      const { activePage } = getState().orders.requestOptions;

      const response = await fetchGetOrders({
        startDate: startDate || '',
        endDate: endDate || '',
        pageSize: ORDERS_PAGE_SIZE,
        offset: (activePage - 1) * ORDERS_PAGE_SIZE,
        });

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    ordersArr: [],
    requestOptions: {
      activePage: 1,
      pagesAmount: 0,
    }
  },
  reducers: {
    changeActivePage: (state, action) => {
      state.requestOptions.activePage = action.payload;
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

export const { changeActivePage } = ordersSlice.actions;

export default ordersSlice.reducer;