import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetIngredients } from "api/api";

export const getIngredients = createAsyncThunk(
  "/ingredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchGetIngredients();

      return response.data.ingredients;
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredientsArr: [],
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredientsArr.push(action.payload);
    },
  },
  extraReducers: {
    [getIngredients.pending]: () => {},
    [getIngredients.fulfilled]: (state, action) => {
      state.ingredientsArr = action.payload;
    },
    [getIngredients.rejected]: () => {},
  },
});

export const { addIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
