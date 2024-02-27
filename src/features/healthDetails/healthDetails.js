import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const healthDetailsApi = createApi({
  reducerPath: "healthDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["healthDetails"], // Define the tag type
  endpoints: (build) => ({
    createHealthDetails: build.mutation({
      query: (data) => ({
        url: "/healthDetails/create-healthDetails",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["healthDetails"],
    }),

    deleteHealthDetails: build.mutation({
      query: (id) => ({
        url: `/healthDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["healthDetails"],
    }),

    updateHealthDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/healthDetails/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["healthDetails"],
    }),

    getSingleHealthDetails: build.query({
      query: (id) => ({
        url: `/healthDetails/${id}`,
      }),
      providesTags: ["healthDetails"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateHealthDetailsMutation,
  useGetSingleHealthDetailsQuery,
  useDeleteHealthDetailsMutation,
  useUpdateHealthDetailsMutation,
} = healthDetailsApi;
