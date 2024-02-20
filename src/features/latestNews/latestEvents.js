import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectsDetailsApi = createApi({
  reducerPath: "projectsDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["projectsDetails"], // Define the tag type
  endpoints: (build) => ({
    createProjectsDetails: build.mutation({
      query: (data) => ({
        url: "/projectDetails/create-projectDetails",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projectsDetails"],
    }),

    deleteProjectsDetails: build.mutation({
      query: (id) => ({
        url: `/projectDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projectsDetails"],
    }),

    updateProjectsDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/projectDetails/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["projectsDetails"],
    }),

    getAllProjectsDetails: build.query({
      query: () => ({
        url: "/projectDetails",
      }),
      providesTags: ["projectsDetails"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateProjectsDetailsMutation,
  useGetAllProjectsDetailsQuery,
  useDeleteProjectsDetailsMutation,
  useUpdateProjectsDetailsMutation,
} = projectsDetailsApi;
