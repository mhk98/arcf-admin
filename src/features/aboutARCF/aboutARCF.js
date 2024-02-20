import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutARCFApi = createApi({
  reducerPath: "aboutARCFApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["aboutARCF"], // Define the tag type
  endpoints: (build) => ({
    createAboutARCF: build.mutation({
      query: (data) => ({
        url: "/aboutARCF/create-aboutARCF",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["aboutARCF"],
    }),

    deleteAboutARCF: build.mutation({
      query: (id) => ({
        url: `/aboutARCF/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["aboutARCF"],
    }),

    updateAboutARCF: build.mutation({
      query: ({ id, data }) => ({
        url: `/aboutARCF/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["aboutARCF"],
    }),

    getAllAboutARCF: build.query({
      query: () => ({
        url: "/aboutARCF",
      }),
      providesTags: ["aboutARCF"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateAboutARCFMutation,
  useGetAllAboutARCFQuery,
  useDeleteAboutARCFMutation,
  useUpdateAboutARCFMutation,
} = aboutARCFApi;
