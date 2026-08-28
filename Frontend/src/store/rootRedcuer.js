import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { productApi } from './api/productApi';
import { orderApi } from './api/orderApi';
import { authApi } from './api/authApi';
import { purchaseApi } from './api/purchaseApi';
import { vendorApi } from './api/vendorApi';

const rootRedcuer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [vendorApi.reducerPath]: vendorApi.reducer,
  auth: authReducer,
});
export default rootRedcuer;
