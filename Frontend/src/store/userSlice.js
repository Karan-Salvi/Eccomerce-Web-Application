import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "unloggedin User",
    email: "undefined",
    avatar: "/images/product4.jpg",
    role: "UnloggedUser",
  },
  reducers: {
    initializeUser: (state, action) => {
      state = action.payload;
      return state;
    },
    logoutUser: (state) => {
      state = {
        name: "unloggedin User",
        email: "undefined",
        avatar: "/images/product4.jpg",
        role: "UnloggedUser",
      };
      return state;
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice;
