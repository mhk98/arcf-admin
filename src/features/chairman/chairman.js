import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chairmanApi = createApi({
  reducerPath: "chairmanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["chairman"], // Define the tag type
  endpoints: (build) => ({
    createChairman: build.mutation({
      query: (data) => ({
        url: "/chairman/create-chairman",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chairman"],
    }),

    deleteChairman: build.mutation({
      query: (id) => ({
        url: `/chairman/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["chairman"],
    }),

    updateChairman: build.mutation({
      query: ({ id, data }) => ({
        url: `/chairman/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["chairman"],
    }),

    getAllChairman: build.query({
      query: () => ({
        url: "/chairman",
      }),
      providesTags: ["chairman"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateChairmanMutation,
  useGetAllChairmanQuery,
  useDeleteChairmanMutation,
  useUpdateChairmanMutation,
} = chairmanApi;
