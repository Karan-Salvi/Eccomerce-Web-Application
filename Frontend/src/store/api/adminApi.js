import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;
const ADMIN_API = `${BASE_URL}/api/v1/`;

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ADMIN_API,
    credentials: 'include',
  }),
  tagTypes: ['AdminUser'],

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => 'users',
      providesTags: ['AdminUser'],
    }),

    getSingleUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: ['AdminUser'],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, name, email, role }) => ({
        url: `user/updateRole/${id}`,
        method: 'PUT',
        body: { name, email, role },
      }),
      invalidatesTags: ['AdminUser'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminUser'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = adminApi;
