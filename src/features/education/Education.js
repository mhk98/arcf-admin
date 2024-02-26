import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const educationApi = createApi({
  reducerPath: "educationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["education"], // Define the tag type
  endpoints: (build) => ({
    createEducation: build.mutation({
      query: (data) => ({
        url: "/education/create-education",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["education"],
    }),

    deleteEducation: build.mutation({
      query: (id) => ({
        url: `/education/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["education"],
    }),

    updateEducation: build.mutation({
      query: ({ id, data }) => ({
        url: `/education/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["education"],
    }),

    getAllEducation: build.query({
      query: () => ({
        url: "/education",
      }),
      providesTags: ["education"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateeducationMutation,
  useGetAlleducationQuery,
  useDeleteeducationMutation,
  useUpdateeducationMutation,
} = educationApi;
