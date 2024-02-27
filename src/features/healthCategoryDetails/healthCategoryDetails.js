import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const healthCategoryDetailsApi = createApi({
  reducerPath: "healthCategoryDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["healthCategoryDetails"], // Define the tag type
  endpoints: (build) => ({
    createhealthCategoryDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/healthCategoryDetails/create-healthCategoryDetails/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["healthCategoryDetails"],
    }),

    deletehealthCategoryDetails: build.mutation({
      query: (id) => ({
        url: `/healthCategoryDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["healthCategoryDetails"],
    }),

    updatehealthCategoryDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/healthCategoryDetails/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["healthCategoryDetails"],
    }),

    getSinglehealthCategoryDetails: build.query({
      query: (id) => ({
        url: `/healthCategoryDetails/${id}`,
      }),

      invalidatesTags: ["healthCategoryDetails"],
    }),
    getAllhealthCategoryDetails: build.query({
      query: () => ({
        url: `/healthCategoryDetails`,
      }),
      providesTags: ["healthCategoryDetails"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreatehealthCategoryDetailsMutation,
  useGetAllhealthCategoryDetailsQuery,
  useGetSinglehealthCategoryDetailsQuery,
  useDeletehealthCategoryDetailsMutation,
  useUpdatehealthCategoryDetailsMutation,
} = healthCategoryDetailsApi;
