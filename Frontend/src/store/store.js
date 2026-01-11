import { configureStore } from '@reduxjs/toolkit';
import rootRedcuer from './rootRedcuer';
import { authApi } from './api/authApi';
import { productApi } from './api/productApi';
import { orderApi } from './api/orderApi';
import { purchaseApi } from './api/purchaseApi';

export const appStore = configureStore({
  reducer: rootRedcuer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      purchaseApi.middleware
    ),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
