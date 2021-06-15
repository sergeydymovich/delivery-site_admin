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
    changeExtraIngredient: (state, action) => {
      state.extraIngredientsArr = state.extraIngredientsArr.map((ingredient) => (
        ingredient._id === action.payload._id ? action.payload : ingredient
      ));
    }
  },
  extraReducers: {
    [getExtraIngredients.pending]: () => {},
    [getExtraIngredients.fulfilled]: (state, action) => {
      state.extraIngredientsArr = action.payload;
    },
    [getExtraIngredients.rejected]: () => {},
  },
});

export const { addExtraIngredient, changeExtraIngredient } = extraIngredientsSlice.actions;

export default extraIngredientsSlice.reducer;
