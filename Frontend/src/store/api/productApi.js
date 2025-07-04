import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;

const PRODUCT_API = `${BASE_URL}/api/v1/`;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PRODUCT_API,
    credentials: "include", // if you're using cookies/session
  }),
  tagTypes: ["Product", "Review"],

  endpoints: (builder) => ({
    //  Get all products
    getAllProducts: builder.query({
      query: () => "products",
      providesTags: ["Product"],
    }),

    //  Create a product (with images)
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "product/new",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    //  Get product details
    getProductDetails: builder.query({
      query: (id) => `product/${id}`,
      providesTags: ["Product"],
    }),

    //  Update product
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    //  Delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    //  Create/Update product review
    createProductReview: builder.mutation({
      query: (reviewData) => ({
        url: "review",
        method: "PUT",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),

    //  Get all reviews of a product
    getAllReviews: builder.query({
      query: (productId) => `reviews/${productId}`,
      providesTags: ["Review"],
    }),

    //  Delete a product review
    deleteProductReview: builder.mutation({
      query: (reviewId) => ({
        url: `review/delete/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useGetAllReviewsQuery,
  useDeleteProductReviewMutation,
} = productApi;
