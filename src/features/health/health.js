import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const healthApi = createApi({
  reducerPath: "healthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["healths"], // Define the tag type
  endpoints: (build) => ({
    createHealth: build.mutation({
      query: (data) => ({
        url: "/health/create-health",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["healths"],
    }),

    deleteHealth: build.mutation({
      query: (id) => ({
        url: `/health/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["healths"],
    }),

    updateHealth: build.mutation({
      query: ({ id, data }) => ({
        url: `/health/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["healths"],
    }),

    getAllHealth: build.query({
      query: () => ({
        url: `/health`,
      }),
      providesTags: ["healths"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const { useCreateHealthMutation, useGetAllHealthQuery, useDeleteHealthMutation, useUpdateHealthMutation } =
  healthApi;
