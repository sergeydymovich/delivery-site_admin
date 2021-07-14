import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pizzaSizesApi } from "api/api";

export const getPizzaSizes = createAsyncThunk(
  "pizza-sizes/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await pizzaSizesApi.get();

      return response.data.pizza_sizes;
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

export const pizzaSizesSlice = createSlice({
  name: "pizzaSizes",
  initialState: {
    pizzaSizesArr: [],
  },
  reducers: {
    addPizzaSize: (state, action) => {
      state.pizzaSizesArr.push(action.payload);
    },
    editPizzaSize: (state, action) => {
      state.pizzaSizesArr = state.pizzaSizesArr.map((pizzaSize) => (
        pizzaSize._id === action.payload._id ? action.payload : pizzaSize
      ));
    },
    deletePizzaSize: (state, action) => {
      state.pizzaSizesArr = state.pizzaSizesArr.filter((size) => size._id !== action.payload);
    },
  },
  extraReducers: {
    [getPizzaSizes.pending]: () => {},
    [getPizzaSizes.fulfilled]: (state, action) => {
      state.pizzaSizesArr = action.payload;
    },
    [getPizzaSizes.rejected]: () => {},
  },
});

export const { addPizzaSize, editPizzaSize, deletePizzaSize } = pizzaSizesSlice.actions;

export default pizzaSizesSlice.reducer;