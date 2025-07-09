import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  orangethenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.orangethenticated = true;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.orangethenticated = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
