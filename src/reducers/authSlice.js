import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    loggedInUser: (state, action) => (state = action.payload),
    loggedOutUser: (state) => (state = {}),
  },
});

export const { loggedInUser, loggedOutUser } = authSlice.actions;

export default authSlice.reducer;
