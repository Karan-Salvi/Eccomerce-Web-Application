import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootRedcuer from './rootRedcuer';
import { authApi } from './api/authApi';
import { productApi } from './api/productApi';
import { orderApi } from './api/orderApi';
import { purchaseApi } from './api/purchaseApi';
import { vendorApi } from './api/vendorApi';
import { recommendationApi } from './api/recommendationApi';
import { adminApi } from './api/adminApi';

export const appStore = configureStore({
  reducer: rootRedcuer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      purchaseApi.middleware,
      vendorApi.middleware,
      recommendationApi.middleware,
      adminApi.middleware
    ),
});

setupListeners(appStore.dispatch);

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
