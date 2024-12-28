import { createSlice } from "@reduxjs/toolkit";

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: [],
  reducers: {
    addNewItem: (state, action) => {
      return [action.payload, ...state];
    },
    deleteItem: (state, action) => {
     
      return state.filter((item) => item._id !== action.payload);
    },
    addInitialItems: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const cartItemsActions = cartItemsSlice.actions;

export default cartItemsSlice;
