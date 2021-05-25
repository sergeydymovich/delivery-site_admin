import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    loggedInUser: (state, action) => (state = action.payload),
    loggedOutUser: (state) => (state = {}),
  },
});

export const { loggedInUser, loggedOutUser } = counterSlice.actions;

export default counterSlice.reducer;
