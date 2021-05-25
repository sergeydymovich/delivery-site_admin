import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesArr: [],
  },
  reducers: {
    getCategories: (state, action) => {
      state.categoriesArr = action.payload;
    },
    addCategory: (state, action) => {
      state.categoriesArr.push(action.payload);
    },
  },
});

export const { getCategories, addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
