import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../features/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

const USER_API = `${BASE_URL}/api/v1/`;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),

    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    forgetPassword: builder.mutation({
      query: (emailData) => ({
        url: "password/forgot",
        method: "POST",
        body: emailData,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `password/reset/${token}`,
        method: "PUT",
        body: newPassword,
      }),
    }),

    updatePassword: builder.mutation({
      query: ({ data }) => ({
        url: `password/update`,
        method: "PUT",
        body: data,
      }),
    }),

    updatePersonalDetail: builder.mutation({
      query: ({ data }) => ({
        url: `me/update`,
        method: "PUT",
        body: data,
      }),
    }),

    updateUserDetails: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `update/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, roleData }) => ({
        url: `/user/updateRole/${id}`,
        method: "PUT",
        body: roleData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useUpdatePersonalDetailMutation,
  useUpdateUserDetailsMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = authApi;
