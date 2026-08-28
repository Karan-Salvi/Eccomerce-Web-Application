import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { vendorApi } from './vendorApi';

const BASE_URL = import.meta.env.VITE_API_URL;

// productApi and vendorApi are separate RTK Query slices (separate reducerPath),
// so `invalidatesTags` on this slice never touches vendorApi's cache — a vendor
// creating/editing/deleting a product here would otherwise see a stale
// getMyProducts list until a hard reload. Dispatching vendorApi's own
// invalidation here keeps both caches in sync regardless of which UI called
// the mutation.
const invalidateVendorProducts = async (arg, { dispatch, queryFulfilled }) => {
  try {
    await queryFulfilled;
    dispatch(vendorApi.util.invalidateTags(['VendorProduct', 'VendorAnalytics']));
  } catch {
    // mutation failed — nothing to invalidate
  }
};

const PRODUCT_API = `${BASE_URL}/api/v1/`;

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: PRODUCT_API,
    credentials: 'include', // if you're using cookies/session
  }),
  tagTypes: ['Product', 'Review'],

  endpoints: (builder) => ({
    //  Get all products
    getAllProducts: builder.query({
      query: () => 'products',
      providesTags: ['Product'],
    }),

    // Get all products by pages
    // getAllProductsByPage: builder.query({
    //   query: ({
    //     page,
    //     limit,
    //     category,
    //     sort,
    //     minPrice,
    //     maxPrice,
    //     minRating,
    //     inStock,
    //     search,
    //   }) =>
    //     `product?page=${page}&limit=${limit}&category=${category}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}&minRating=${minRating}&inStock=${inStock}&search=${search}`,
    //   providesTags: ['Product'],
    // }),

    getAllProductsByPage: builder.query({
      query: ({
        page = 1,
        limit = 12,
        category,
        sort,
        minPrice,
        maxPrice,
        minRating,
        inStock,
        search,
      }) => ({
        url: 'product',
        params: {
          page,
          limit,
          ...(category && { category }), // multiple: a,b,c
          ...(sort && { sort }), // newest | price_asc | price_desc | rating
          ...(minPrice !== undefined && { minPrice }),
          ...(maxPrice !== undefined && { maxPrice }),
          ...(minRating !== undefined && { minRating }),
          ...(inStock !== undefined && { inStock }), // true / false
          ...(search && { search }),
        },
      }),
      providesTags: ['Product'],
    }),

    //  Create a product (with images)
    createProduct: builder.mutation({
      query: (formData) => ({
        url: 'product/new',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Product'],
      onQueryStarted: invalidateVendorProducts,
    }),

    //  Get product details
    getProductDetails: builder.query({
      query: (id) => `product/${id}`,
      providesTags: ['Product'],
    }),

    //  Update product
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `product/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
      onQueryStarted: invalidateVendorProducts,
    }),

    //  Delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
      onQueryStarted: invalidateVendorProducts,
    }),

    //  Create/Update product review
    createProductReview: builder.mutation({
      query: (reviewData) => ({
        url: 'review',
        method: 'PUT',
        body: reviewData,
      }),
      invalidatesTags: ['Review'],
    }),

    //  Get all reviews of a product
    getAllReviews: builder.query({
      query: (productId) => `reviews/${productId}`,
      providesTags: ['Review'],
    }),

    //  Delete a product review
    deleteProductReview: builder.mutation({
      query: (reviewId) => ({
        url: `review/delete/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllProductsByPageQuery,
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useGetAllReviewsQuery,
  useDeleteProductReviewMutation,
} = productApi;
