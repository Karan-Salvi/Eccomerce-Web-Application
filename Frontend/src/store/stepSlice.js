import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
  name: "stepList",
  initialState: [1],
  reducers: {
    AddStep: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const stepSliceActions = stepSlice.actions;

export default stepSlice;
