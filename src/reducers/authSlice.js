import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    loggedInUser: (state, action) => {
      state.user = action.payload;
    },
    loggedOutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loggedInUser } = counterSlice.actions;

export default counterSlice.reducer;
