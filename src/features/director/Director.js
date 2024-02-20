import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const directorApi = createApi({
  reducerPath: "directorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["director"], // Define the tag type
  endpoints: (build) => ({
    createDirector: build.mutation({
      query: (data) => ({
        url: "/director/create-director",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["director"],
    }),

    deleteDirector: build.mutation({
      query: (id) => ({
        url: `/director/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["director"],
    }),

    updateDirector: build.mutation({
      query: ({ id, data }) => ({
        url: `/director/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["director"],
    }),

    getAllDirector: build.query({
      query: () => ({
        url: "/director",
      }),
      providesTags: ["director"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useGetAllDirectorQuery,
  useCreateDirectorMutation,
  useDeleteDirectorMutation,
  useUpdateDirectorMutation,
} = directorApi;
