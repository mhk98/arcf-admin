import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const NewsApi = createApi({
  reducerPath: "NewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["News"], // Define the tag type
  endpoints: (build) => ({
    createNews: build.mutation({
      query: (data) => ({
        url: "/news/create-news",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["News"],
    }),

    deleteNews: build.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),

    updateNews: build.mutation({
      query: ({ id, data }) => ({
        url: `/news/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["News"],
    }),

    getAllNews: build.query({
      query: () => ({
        url: "/news",
      }),
      providesTags: ["News"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const { useCreateNewsMutation, useGetAllNewsQuery, useDeleteNewsMutation, useUpdateNewsMutation } = NewsApi;
