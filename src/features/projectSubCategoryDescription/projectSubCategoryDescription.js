import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProjectSubCategoryDescriptionApi = createApi({
  reducerPath: "ProjectSubCategoryDescriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),

  tagTypes: ["ProjectSubCategoryDescription"], // Define the tag type
  endpoints: (build) => ({
    createProjectSubCategoryDescription: build.mutation({
      query: ({ projectId, subCategoryId, data }) => ({
        url: `/ProjectSubCategoryDescription/create-projectSubCategoryDescription/${projectId}/${subCategoryId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProjectSubCategoryDescription"],
    }),

    deleteProjectSubCategoryDescription: build.mutation({
      query: (id) => ({
        url: `/projectSubCategoryDescription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectSubCategoryDescription"],
    }),

    updateProjectSubCategoryDescription: build.mutation({
      query: ({ projectId, subCategoryId, data }) => ({
        url: `/projectSubCategoryDescription/${projectId}/${subCategoryId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ProjectSubCategoryDescription"],
    }),

    getSingleProjectSubCategoryDescription: build.query({
      query: (id) => ({
        url: `/projectSubCategoryDescription/${id}`,
      }),
      invalidatesTags: ["ProjectSubCategoryDescription"],
    }),
    getAllProjectSubCategoryDescription: build.query({
      query: () => ({
        url: "/projectSubCategoryDescription",
      }),
      providesTags: ["ProjectSubCategoryDescription"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateProjectSubCategoryDescriptionMutation,
  useGetAllProjectSubCategoryDescriptionQuery,
  useGetSingleProjectSubCategoryDescriptionQuery,
  useDeleteProjectSubCategoryDescriptionMutation,
  useUpdateProjectSubCategoryDescriptionMutation,
} = ProjectSubCategoryDescriptionApi;
