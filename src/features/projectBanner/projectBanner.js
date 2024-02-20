import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectsBannerApi = createApi({
  reducerPath: "projectsBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["projectsBanner"], // Define the tag type
  endpoints: (build) => ({
    createProjectsBanner: build.mutation({
      query: (data) => ({
        url: "/projectBanner/create-projectBanner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projectsBanner"],
    }),

    deleteProjectsBanner: build.mutation({
      query: (id) => ({
        url: `/projectBanner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projectsBanner"],
    }),

    updateProjectsBanner: build.mutation({
      query: ({ id, data }) => ({
        url: `/projectBanner/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["projectsBanner"],
    }),

    getAllProjectsBanner: build.query({
      query: () => ({
        url: "/projectBanner",
      }),
      providesTags: ["projectsBanner"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateProjectsBannerMutation,
  useGetAllProjectsBannerQuery,
  useDeleteProjectsBannerMutation,
  useUpdateProjectsBannerMutation,
} = projectsBannerApi;
