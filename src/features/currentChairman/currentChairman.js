import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const currentChairmanApi = createApi({
  reducerPath: "currentChairmanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["chairman"], // Define the tag type
  endpoints: (build) => ({
    createCurrentChairman: build.mutation({
      query: (data) => ({
        url: "/currentChairman/create-currentChairman",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CurrentChairman"],
    }),

    deleteCurrentChairman: build.mutation({
      query: (id) => ({
        url: `/currentChairman/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CurrentChairman"],
    }),

    updateCurrentChairman: build.mutation({
      query: ({ id, data }) => ({
        url: `/currentChairman/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CurrentChairman"],
    }),

    getAllCurrentChairman: build.query({
      query: () => ({
        url: "/currentChairman",
      }),
      providesTags: ["CurrentChairman"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateCurrentChairmanMutation,
  useGetAllCurrentChairmanQuery,
  useDeleteCurrentChairmanMutation,
  useUpdateCurrentChairmanMutation,
} = currentChairmanApi;
