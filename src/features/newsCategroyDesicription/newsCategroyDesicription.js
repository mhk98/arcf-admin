import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsCategoryDescriptionApi = createApi({
  reducerPath: "newsCategoryDescriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["newsCategoryDescription"], // Define the tag type
  endpoints: (build) => ({
    createnewsCategoryDescription: build.mutation({
      query: ({ id, data }) => ({
        url: `/newsCategoryDescription/create-newsCategoryDescription/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["newsCategoryDescription"],
    }),

    deletenewsCategoryDescription: build.mutation({
      query: (id) => ({
        url: `/newsCategoryDescription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["newsCategoryDescription"],
    }),

    updatenewsCategoryDescription: build.mutation({
      query: ({ id, data }) => ({
        url: `/newsCategoryDescription/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["newsCategoryDescription"],
    }),

    getSinglenewsCategoryDescription: build.query({
      query: (id) => ({
        url: `/newsCategoryDescription/${id}`,
      }),
      invalidatesTags: ["newsCategoryDescription"],
    }),
    getAllnewsCategoryDescription: build.query({
      query: () => ({
        url: "/newsCategoryDescription",
      }),
      providesTags: ["newsCategoryDescription"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreatenewsCategoryDescriptionMutation,
  useGetAllnewsCategoryDescriptionQuery,
  useGetSinglenewsCategoryDescriptionQuery,
  useDeletenewsCategoryDescriptionMutation,
  useUpdatenewsCategoryDescriptionMutation,
} = newsCategoryDescriptionApi;
