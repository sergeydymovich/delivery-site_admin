import { createSlice } from "@reduxjs/toolkit";

export const extraIngredientsSlice = createSlice({
  name: "extraIngredients",
  initialState: {
    extraIngredientsArr: [],
  },
  reducers: {
    getExtraIngredients: (state, action) => {
      state.extraIngredientsArr = action.payload;
    },
    addExtraIngredient: (state, action) => {
      state.extraIngredientsArr.push(action.payload);
    },
  },
});

export const { getExtraIngredients, addExtraIngredient } =
  extraIngredientsSlice.actions;

export default extraIngredientsSlice.reducer;
