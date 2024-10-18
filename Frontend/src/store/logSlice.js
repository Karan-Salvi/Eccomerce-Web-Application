import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "logStatus",
  initialState: true,
  reducers: {
    changeStatus: (state) => {
      return (!state);
    },
  },
});

export const logActions = logSlice.actions;

export default logSlice;
