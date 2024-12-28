import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./logSlice";
import currentProductSlice from "./currentProductSlice";
import messageSlice from "./messageSlice";
import cartItemsSlice from "./cartSlice";
import stepSlice from "./stepSlice";
import userSlice from "./userSlice";

const TrendyCartStore = configureStore({
  reducer: {
    logStatus: logSlice.reducer,
    currentProduct: currentProductSlice.reducer,
    message: messageSlice.reducer,
    cartItems: cartItemsSlice.reducer,
    stepList: stepSlice.reducer,
    user: userSlice.reducer,
  },
});

export default TrendyCartStore;
