import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoriesApi } from "api/api";

export const getCategories = createAsyncThunk(
  "categories/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.get();

      return response.data.categories;
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesArr: [],
  },
  reducers: {
    addCategory: (state, action) => {
      state.categoriesArr.push(action.payload);
    },
    editCategory: (state, action) => {
      state.categoriesArr = state.categoriesArr.map((category) => (
        category._id === action.payload._id ? action.payload : category
      ));
    }
  },
  extraReducers: {
    [getCategories.pending]: () => {},
    [getCategories.fulfilled]: (state, action) => {
      state.categoriesArr = action.payload;
    },
    [getCategories.rejected]: () => {},
  },
});

export const { addCategory, editCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
