import { createSlice } from "@reduxjs/toolkit";

const currentProductSlice = createSlice({
  name: "currentProduct",
  initialState: "",
  reducers: {
    setCurrentProduct: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const currentProductActions = currentProductSlice.actions;

export default currentProductSlice;
