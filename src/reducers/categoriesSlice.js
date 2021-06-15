import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetCategories } from "api/api";

export const getCategories = createAsyncThunk(
  "/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchGetCategories();

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
    changeCategory: (state, action) => {
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

export const { addCategory, changeCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
