import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const assistantViceChairmanApi = createApi({
  reducerPath: "assistantViceChairmanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["chairman"], // Define the tag type
  endpoints: (build) => ({
    createAssistantViceChairman: build.mutation({
      query: (data) => ({
        url: "/assistantViceChairman/create-assistantViceChairman",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chairman"],
    }),

    deleteAssistantViceChairman: build.mutation({
      query: (id) => ({
        url: `/assistantViceChairman/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["chairman"],
    }),

    updateAssistantViceChairman: build.mutation({
      query: ({ id, data }) => ({
        url: `/assistantViceChairman/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["chairman"],
    }),

    getAllAssistantViceChairman: build.query({
      query: () => ({
        url: "/assistantViceChairman",
      }),
      providesTags: ["chairman"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateAssistantViceChairmanMutation,
  useGetAllAssistantViceChairmanQuery,
  useDeleteAssistantViceChairmanMutation,
  useUpdateAssistantViceChairmanMutation,
} = assistantViceChairmanApi;
