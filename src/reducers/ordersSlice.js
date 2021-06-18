import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetOrders } from "api/api";

export const getOrders = createAsyncThunk(
  "/orders",
  async ({ startDate, endDate }, { rejectWithValue, getState }) => {
    try {
      console.log('зашел ордер санк')
      const { activePage, pageSize } = getState().orders.requestOptions;
  
      const response = await fetchGetOrders({
        startDate: startDate || '',
        endDate: endDate || '',
        pageSize,
        offset: (activePage - 1) * pageSize,
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
      pageSize: 15,
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
      state.requestOptions.pagesAmount = Math.ceil(action.payload.ordersAmount / state.requestOptions.pageSize);
    },
    [getOrders.rejected]: () => {},
  },
});

export const { changeActivePage } = ordersSlice.actions;

export default ordersSlice.reducer;