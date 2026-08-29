import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { productApi } from './api/productApi';
import { orderApi } from './api/orderApi';
import { authApi } from './api/authApi';
import { purchaseApi } from './api/purchaseApi';
import { vendorApi } from './api/vendorApi';
import { recommendationApi } from './api/recommendationApi';
import { adminApi } from './api/adminApi';

const rootRedcuer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [vendorApi.reducerPath]: vendorApi.reducer,
  [recommendationApi.reducerPath]: recommendationApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  auth: authReducer,
});
export default rootRedcuer;
