import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProjectSubCategoryDetailsApi = createApi({
  reducerPath: "ProjectSubCategoryDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1",
  }),

  tagTypes: ["ProjectSubCategoryDetails"], // Define the tag type
  endpoints: (build) => ({
    createProjectSubCategoryDetails: build.mutation({
      query: (data) => ({
        url: "/projectSubCategoryDetails/create-projectSubCategoryDetails",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProjectSubCategoryDetails"],
    }),

    deleteProjectSubCategoryDetails: build.mutation({
      query: (id) => ({
        url: `/projectSubCategoryDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectSubCategoryDetails"],
    }),

    updateProjectSubCategoryDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/projectSubCategoryDetails/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ProjectSubCategoryDetails"],
    }),

    getSingleProjectSubCategoryDetails: build.query({
      query: ({ projectId, subcategoryId }) => ({
        url: `/projectSubCategoryDetails/${projectId}/${subcategoryId}`,
      }),
      invalidatesTags: ["ProjectSubCategoryDetails"],
    }),
    getAllProjectSubCategoryDetails: build.query({
      query: () => ({
        url: "/projectSubCategoryDetails",
      }),
      providesTags: ["ProjectSubCategoryDetails"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateProjectSubCategoryDetailsMutation,
  useGetAllProjectSubCategoryDetailsQuery,
  useGetSingleProjectSubCategoryDetailsQuery,
  useDeleteProjectSubCategoryDetailsMutation,
  useUpdateProjectSubCategoryDetailsMutation,
} = ProjectSubCategoryDetailsApi;
