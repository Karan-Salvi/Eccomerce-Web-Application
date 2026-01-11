import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;

const ORDER_API = `${BASE_URL}/api/v1`;

export const purchaseApi = createApi({
  reducerPath: 'purchaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ORDER_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (order) => ({
        url: '/order/new',
        method: 'POST',
        body: order,
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: 'GET',
      }),
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;
