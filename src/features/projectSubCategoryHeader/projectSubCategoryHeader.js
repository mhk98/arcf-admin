import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProjectSubCategoryHeaderApi = createApi({
  reducerPath: "ProjectSubCategoryHeaderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1",
  }),

  tagTypes: ["ProjectSubCategoryHeader"], // Define the tag type
  endpoints: (build) => ({
    createProjectSubCategoryHeader: build.mutation({
      query: ({ id, data }) => ({
        url: `/projectSubCategoryHeader/create-projectSubCategoryHeader/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProjectSubCategoryHeader"],
    }),

    deleteProjectSubCategoryHeader: build.mutation({
      query: (id) => ({
        url: `/projectSubCategoryHeader/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectSubCategoryHeader"],
    }),

    updateProjectSubCategoryHeader: build.mutation({
      query: ({ id, data }) => ({
        url: `/projectSubCategoryHeader/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ProjectSubCategoryHeader"],
    }),

    getSingleProjectSubCategoryHeader: build.query({
      query: (id) => ({
        url: `/projectSubCategoryHeader/${id}`,
      }),
      invalidatesTags: ["ProjectSubCategoryHeader"],
    }),
    getAllProjectSubCategoryHeader: build.query({
      query: () => ({
        url: "/projectSubCategoryHeader",
      }),
      providesTags: ["ProjectSubCategoryHeader"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateProjectSubCategoryHeaderMutation,
  useGetAllProjectSubCategoryHeaderQuery,
  useDeleteProjectSubCategoryHeaderMutation,
  useUpdateProjectSubCategoryHeaderMutation,
  useGetSingleProjectSubCategoryHeaderQuery,
} = ProjectSubCategoryHeaderApi;
