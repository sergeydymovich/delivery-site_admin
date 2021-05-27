import { createSlice } from "@reduxjs/toolkit";

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredientsArr: [],
  },
  reducers: {
    getIngredients: (state, action) => {
      state.ingredientsArr = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredientsArr.push(action.payload);
    },
  },
});

export const { getIngredients, addIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
