import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    loggedInUser: (state, action) => (state = action.payload),
    loggedOutUser: (state) => {
      state = null;
    },
  },
});

export const { loggedInUser } = counterSlice.actions;

export default counterSlice.reducer;
