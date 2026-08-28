import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;
const RECOMMENDATION_API = `${BASE_URL}/api/v1/recommendations/`;

export const recommendationApi = createApi({
  reducerPath: 'recommendationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: RECOMMENDATION_API,
    credentials: 'include',
  }),
  tagTypes: ['SimilarProducts', 'RecommendationsForMe'],

  endpoints: (builder) => ({
    getSimilarProducts: builder.query({
      query: (productId) => `similar/${productId}`,
      providesTags: (result, error, productId) => [{ type: 'SimilarProducts', id: productId }],
    }),

    getRecommendationsForMe: builder.query({
      query: () => 'for-me',
      providesTags: ['RecommendationsForMe'],
    }),
  }),
});

export const { useGetSimilarProductsQuery, useGetRecommendationsForMeQuery } = recommendationApi;
