import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "api/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ phone, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetchLogin(phone, password);
      const { user, token } = response.data;

      return { ...user, token };
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    errorMessage: "",
  },
  extraReducers: {
    [login.pending]: () => {},
    [login.fulfilled]: (state, action) => (state.user = action.payload),
    [login.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setUserInfo, loggedOutUser } = authSlice.actions;

export default authSlice.reducer;
