import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;
const VENDOR_API = `${BASE_URL}/api/v1/vendor/`;

export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: VENDOR_API,
    credentials: 'include',
  }),
  tagTypes: ['VendorProduct', 'VendorOrder', 'VendorAnalytics'],

  endpoints: (builder) => ({
    getMyProducts: builder.query({
      query: ({ page = 1, limit = 12 } = {}) => ({
        url: 'products',
        params: { page, limit },
      }),
      providesTags: ['VendorProduct'],
    }),

    getMyOrders: builder.query({
      query: () => 'orders',
      providesTags: ['VendorOrder'],
    }),

    getMyAnalytics: builder.query({
      query: () => 'analytics',
      providesTags: ['VendorAnalytics'],
    }),
  }),
});

export const { useGetMyProductsQuery, useGetMyOrdersQuery, useGetMyAnalyticsQuery } = vendorApi;
