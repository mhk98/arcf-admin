import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const managementApi = createApi({
  reducerPath: "managementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),

  tagTypes: ["management"], // Define the tag type
  endpoints: (build) => ({
    createManagement: build.mutation({
      query: (data) => ({
        url: "/management/create-management",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["management"],
    }),

    deleteManagement: build.mutation({
      query: (id) => ({
        url: `/management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["management"],
    }),

    updateManagement: build.mutation({
      query: ({ id, data }) => ({
        url: `/management/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["management"],
    }),

    getAllManagement: build.query({
      query: () => ({
        url: "/management",
      }),
      providesTags: ["management"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateManagementMutation,
  useGetAllManagementQuery,
  useDeleteManagementMutation,
  useUpdateManagementMutation,
} = managementApi;
