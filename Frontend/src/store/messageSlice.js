import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
  name: "message",
  initialState: {
    success: false,
    message: "Process successfully Done..",
  },
  reducers: {
    setMessage: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice;
