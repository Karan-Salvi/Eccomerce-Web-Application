import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;

const ORDER_API = `${BASE_URL}/api/v1/`;

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ORDER_API,
    credentials: "include",
  }),
  tagTypes: ["Order"],

  endpoints: (builder) => ({
    // ✅ Create new order
    createNewOrder: builder.mutation({
      query: (orderData) => ({
        url: "order/new",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    // ✅ Get single order by ID
    getSingleOrder: builder.query({
      query: (id) => `order/${id}`,
      providesTags: ["Order"],
    }),

    // ✅ Get logged-in user's orders
    getMyOrders: builder.query({
      query: () => "orders/me",
      providesTags: ["Order"],
    }),

    // ✅ Get all orders (Admin)
    getAllOrders: builder.query({
      query: () => "orders",
      providesTags: ["Order"],
    }),

    // ✅ Update order status (Admin)
    updateOrderStatus: builder.mutation({
      query: ({ id, statusData }) => ({
        url: `order/update/${id}`,
        method: "PUT",
        body: statusData,
      }),
      invalidatesTags: ["Order"],
    }),

    // ✅ Delete order (Admin)
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `order/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useGetSingleOrderQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
