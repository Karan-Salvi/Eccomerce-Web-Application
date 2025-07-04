import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootRedcuer";
import { authApi } from "./api/authApi";

export const appStore = configureStore({
  reducer: rootRedcuer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
