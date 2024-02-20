import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsBannerApi = createApi({
  reducerPath: "newsBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["newsBanner"], // Define the tag type
  endpoints: (build) => ({
    createNewsBanner: build.mutation({
      query: (data) => ({
        url: "/newsBanner/create-newsBaner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["newsBanner"],
    }),

    deleteNewsBanner: build.mutation({
      query: (id) => ({
        url: `/newsBanner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["newsBanner"],
    }),

    updateNewsBanner: build.mutation({
      query: ({ id, data }) => ({
        url: `/newsBanner/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["newsBanner"],
    }),

    getAllNewsBanner: build.query({
      query: () => ({
        url: "/newsBanner",
      }),
      providesTags: ["newsBanner"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateNewsBannerMutation,
  useGetAllNewsBannerQuery,
  useDeleteNewsBannerMutation,
  useUpdateNewsBannerMutation,
} = newsBannerApi;
