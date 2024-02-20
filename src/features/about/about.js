import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["about"], // Define the tag type
  endpoints: (build) => ({
    createAbout: build.mutation({
      query: (data) => ({
        url: "/about/create-about",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),

    deleteAbout: build.mutation({
      query: (id) => ({
        url: `/about/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["about"],
    }),

    updateAbout: build.mutation({
      query: ({ id, data }) => ({
        url: `/about/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),

    getAllAbout: build.query({
      query: () => ({
        url: "/about",
      }),
      providesTags: ["about"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const { useGetAllAboutQuery, useCreateAboutMutation, useDeleteAboutMutation, useUpdateAboutMutation } = aboutApi;
