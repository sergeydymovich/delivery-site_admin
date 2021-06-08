import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetExtraIngredients } from "api/api";

export const getExtraIngredients = createAsyncThunk(
  "/extra-ingredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchGetExtraIngredients();

      return response.data.ingredients;
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

export const extraIngredientsSlice = createSlice({
  name: "extraIngredients",
  initialState: {
    extraIngredientsArr: [],
  },
  reducers: {
    addExtraIngredient: (state, action) => {
      state.extraIngredientsArr.push(action.payload);
    },
  },
  extraReducers: {
    [getExtraIngredients.pending]: () => {},
    [getExtraIngredients.fulfilled]: (state, action) => {
      state.extraIngredientsArr = action.payload;
    },
    [getExtraIngredients.rejected]: () => {},
  },
});

export const { addExtraIngredient } = extraIngredientsSlice.actions;

export default extraIngredientsSlice.reducer;
