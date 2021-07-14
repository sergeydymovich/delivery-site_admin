import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ingredientsApi } from "api/api";

export const getIngredients = createAsyncThunk(
  "ingredients/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ingredientsApi.get();

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
    editIngredient: (state, action) => {
      state.ingredientsArr = state.ingredientsArr.map((ingredient) => (
        ingredient._id === action.payload._id ? action.payload : ingredient
      ));
    }
  },
  extraReducers: {
    [getIngredients.pending]: () => {},
    [getIngredients.fulfilled]: (state, action) => {
      state.ingredientsArr = action.payload;
    },
    [getIngredients.rejected]: () => {},
  },
});

export const { addIngredient, editIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
