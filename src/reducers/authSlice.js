import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "api/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ phone, password }, { rejectWithValue }) => {
    try {   
      const response = await authApi.login({ phone, password });
      const { user, token } = response.data;

      return { user, token };
    } catch (e) {
      return rejectWithValue(e.response.data.errorMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    logout: (state) => {
      state.user = {};
      state.token = null;
    },
  },
  extraReducers: {
    [login.pending]: () => {},
    [login.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    [login.rejected]: () => {},
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
