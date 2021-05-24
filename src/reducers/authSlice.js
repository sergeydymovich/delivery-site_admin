import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    loggedInUser: (state, action) => {
      const { firstName, role, token } = action.payload;
      state.name = firstName;
      state.role = role;
      state.token = token;
    },
    loggedOutUser: (state) => {
      state = null;
    },
  },
});

export const { loggedInUser } = counterSlice.actions;

export default counterSlice.reducer;
