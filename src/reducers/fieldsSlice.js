import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetFields } from "api/api";

export const getFields = createAsyncThunk(
  "/fields",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchGetFields();

      return response.data.fields;
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

export const fieldsSlice = createSlice({
  name: "fields",
  initialState: {
    fieldsArr: [],
  },
  reducers: {
    addField: (state, action) => {
      state.fieldsArr.push(action.payload);
    },
    changeField: (state, action) => {
      state.fieldsArr = state.fieldsArr.map((field) => (
        field._id === action.payload._id ? action.payload : field
      ));
    },
    deleteField: (state, action) => {
      state.fieldsArr = state.fieldsArr.filter((field) => field._id !== action.payload);
    },
  },
  extraReducers: {
    [getFields.pending]: () => {},
    [getFields.fulfilled]: (state, action) => {
      state.fieldsArr = action.payload;
    },
    [getFields.rejected]: () => {},
  },
});

export const { addField, changeField, deleteField } = fieldsSlice.actions;

export default fieldsSlice.reducer;