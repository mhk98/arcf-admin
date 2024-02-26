import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const NewsDetailsApi = createApi({
  reducerPath: "NewsDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["NewsDetails"], // Define the tag type
  endpoints: (build) => ({
    createNewsDetails: build.mutation({
      query: (data) => ({
        url: "/newsDetails/create-newsDetails",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["NewsDetails"],
    }),

    deleteNewsDetails: build.mutation({
      query: (id) => ({
        url: `/newsDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NewsDetails"],
    }),

    updateNewsDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/newsDetails/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["NewsDetails"],
    }),

    getAllNewsDetails: build.query({
      query: () => ({
        url: "/newsDetails",
      }),
      providesTags: ["NewsDetails"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateNewsDetailsMutation,
  useGetAllNewsDetailsQuery,
  useDeleteNewsDetailsMutation,
  useUpdateNewsDetailsMutation,
} = NewsDetailsApi;
