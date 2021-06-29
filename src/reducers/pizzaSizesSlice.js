import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetPizzaSizes } from "api/api";

export const getPizzaSizes = createAsyncThunk(
  "/pizza-sizes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchGetPizzaSizes();

      return response.data.pizzaSizes;
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
    changePizzaSize: (state, action) => {
      state.pizzaSizesArr = state.pizzaSizesArr.map((pizzaSize) => (
        pizzaSize._id === action.payload._id ? action.payload : pizzaSize
      ));
    }
  },
  extraReducers: {
    [getPizzaSizes.pending]: () => {},
    [getPizzaSizes.fulfilled]: (state, action) => {
      state.pizzaSizesArr = action.payload;
    },
    [getPizzaSizes.rejected]: () => {},
  },
});

export const { changePizzaSize } = pizzaSizesSlice.actions;

export default pizzaSizesSlice.reducer;